/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {

    constructor() {
        this.bd = new LevelSandbox.LevelSandbox();
        this.chain = [];
        this.generateGenesisBlock();
    }

    // Helper method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    generateGenesisBlock() {
        if (this.chain.length === 0) {
            return this.addBlock(new Block.Block('First block in the chain - Genesis block'));
        }
    }

    // Get block height, it is a helper method that return the height of the blockchain
    getBlockHeight() {
        return this.chain.length - 1;
    }

    // Add new block
    addBlock(block) {
        // block hash
        block.hash = SHA256(JSON.stringify(block).toString());
        // UTC timestamp
        block.time = new Date().getTime().toString().slice(0, -3);
        // block height
        block.height = this.chain.length;
        // previous block hash
        if (this.chain.length > 0) {
            block.previousBlockHash = this.chain[this.chain.length - 1].hash;
        }
        // add block
        this.chain.push(block);
    }

    // Get Block By Height
    getBlock(height) {
        return JSON.parse(JSON.stringify(this.chain[height]));
    }

    // Validate if Block is being tampered by Block Height
    validateBlock(height) {
        // get block
        let block = this.getBlock(height);
        // get block hash
        let blockHash = block.hash;
        // remove block hash for test
        block.hash = '';
        // create valid hash
        let validBlockHash = SHA256(JSON.stringify(block)).toString();
        // comparison
        if (blockHash === validBlockHash) {
            return true;
        } else {
            console.log('Block No. ' + height + ' invalid hash:\n' + blockHash + '-' + validBlockHash);
            return false;
        }
    }

    // Validate Blockchain
    validateChain() {
        let errorLog = [];
        for (var i = 0; i < this.chain.length - 1; i++) {
            // check block validation
            if (!this.validateBlock(i)) {
                errorLog.push(i);
            }
            // compare block hashes
            let blockHash = this.chain[i].hash;
            let previousHash = this.chain[i + 1].previousBlockHash;
            if (blockHash !== previousHash) {
                errorLog.push(i);
            }
        }

        if (errorLog.length > 0) {
            console.log('Total errors = ' + errorLog.length);
            console.log('Blocks: ' + errorLog);
        } else {
            console.log('No error found');
        }
    }

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    _modifyBlock(height, block) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.bd.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(blockModified);
            }).catch((err) => { console.log(err); reject(err) });
        });
    }

}

module.exports.Blockchain = Blockchain;
