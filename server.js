const express = require('express');
const cors = require('cors');

const myRouter = require('./myRouter.js');
const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

server.use('/api/posts', myRouter);

module.exports = server; // CommonJS module syntax