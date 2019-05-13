/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block {
	constructor(data) {
		this.hash = '';
		this.time = 0;
		this.height = 0;
		this.data = data;
		this.previousBlockHash = '';
	}
}

module.exports = Block;