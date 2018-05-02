const app = require('express')();
const bodyParser = require("body-parser");
const http = require('http').Server(app);

const Blockchain = require('../lib/blockchain');
const Transaction = require('../lib/transaction');

class Service
{
  constructor (argv) {
    this.blockchain = new Blockchain(argv.coinbase);
    this.server(argv.port)
  };

  server (port) {
    logger.info('Starting Service ...');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    http.listen(port, () => {
      logger.info(`Server listening on *:${port} ...`);
    });

    app.get('/balanceOf/:address', (req, res) => {
      res.json({ balance: this.blockchain.getBalanceOfAddress(req.params.address) });
    });

    app.get('/chain', (req, res) => {
      res.json(this.blockchain.chain);
    });

    app.get('/latestBlock', (req, res) => {
      res.json(this.blockchain.getLatestBlock());
    });

    app.post('/createTransaction', (req, res) => {
      logger.info(`Submitted transaction: ${JSON.stringify(req.body)}`);
      const result = this.blockchain.createTransaction(new Transaction(req.body.fromAddress, req.body.toAddress, req.body.amount));
      if (result === true) {
        logger.debug("Start mining");
        this.blockchain.minePendingTransactions();
        logger.debug(`Latest block: ${JSON.stringify(this.blockchain.getLatestBlock())}`);
        res.json(this.blockchain.getLatestBlock());
      } else {
        res.json({ error: { code: 400, message: 'Transaction failed' }});
      }
    });
  };
}

module.exports = Service;
