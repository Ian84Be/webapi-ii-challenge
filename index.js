const server = require('./server.js');

const portNo = 4000;

server.listen(portNo, () => {
  console.log(`\n*** Server Running on http://localhost:${portNo} ***\n`);
});