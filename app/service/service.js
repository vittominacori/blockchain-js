const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Blockchain = require('../lib/blockchain');
const Transaction = require('../lib/transaction');

class Service
{
  constructor (argv) {
    this.blockchain = new Blockchain();
    this.server(argv.port)
  };

  server (port) {
    logger.info('Starting Service ...');

    http.listen(port, () => {
      logger.info(`Server listening on *:${port} ...`);
    });

    io.on('connection', (socket) => {
      socket.on('createTransaction', (data) => {
        logger.info(`Transaction sent: ${JSON.stringify(data)}`);
        this.blockchain.createTransaction(new Transaction(data.fromAddress, data.toAddress, data.amount));
        this.blockchain.minePendingTransactions('coinbase-address');
        logger.debug(JSON.stringify(this.blockchain.getLatestBlock()));
      });
    });
  };
}

module.exports = Service;