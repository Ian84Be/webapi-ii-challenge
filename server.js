const express = require('express');

const myRouter = require('./myRouter.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

server.use('/api/posts', myRouter);

module.exports = server; // CommonJS module syntax