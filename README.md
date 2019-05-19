# Project #3. Connect Private Blockchain to Front-End Client via APIs

In Project 2: Create Your Own Private Blockchain, we solved the challenge of how to persist our blockchain dataset. The next challenge is to build a RESTful API using a Node.js framework that will interfaces with the private blockchain.

By configuring an API for your private blockchain you expose functionality that can be consumed by several types of web clients ranging from desktop, mobile, and IoT devices. In the current project, i created two endpoints using [Express.js](https://expressjs.com/) framework:

* GET block
* POST block

## Setup project

To setup the project do the following:
1. Download the project.
2. Run command `npm install` to install the project dependencies.

## Run the project

The file __app.js__ in the root directory has all the code to be able to run the project. In the root directory run the command `node app.js`

## Test the project

The project can be tested either using [Postman](https://www.getpostman.com/) or [Curl](https://curl.haxx.se/).

*Get Block endpoint*
```
http:localhost:8000/block/[blockHeight]
```
Curl example:
Type the following command in the terminal:
```
curl http:localhost:8000/block/0
```
Postman example:
Type the following command in the __Postman__ and select __Get__ option:
```
http:localhost:8000/block/0
```
*Post Block endpoint*

```
http://localhost:8000/block
```

Curl example:
```
curl -X "POST" "http://localhost:8000/block" \
     -H 'Content-Type: application/json' \
     -d $'{
  "body": "Testing block with test string data"
}'
```

Postman example:
Type the following command in the __Postman__ and select __Post__ option and add *data* parameter in *body*:
```
http:localhost:8000/block
```