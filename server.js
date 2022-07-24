const express = require('express');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

module.exports = (transactionRouterHandler) => {
  server.use('/opreturn', transactionRouterHandler);

  server.listen(3000, () => {
    console.log('Server is running on 3000');
  });
};
