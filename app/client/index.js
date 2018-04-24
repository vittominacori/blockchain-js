require('dotenv').config();

const Logger = require('../lib/logger');

const Api = require('../lib/api');

const argv = require('yargs')
  .option('log', {
    alias: 'l',
    describe: 'log level for logger. ',
    default:  process.env.LOG_LEVEL
  })
  .option('endpoint', {
    alias: 'e',
    describe: 'endpoint for service listening. ',
    default:  process.env.ENDPOINT
  })
  .option('port', {
    alias: 'p',
    describe: 'port for service listening. ',
    default:  process.env.PORT
  })
  .option('coinbase', {
    alias: 'c',
    describe: 'base address for service. ',
    default:  process.env.COINBASE
  })
  .help('help')
  .argv;

global.logger = new Logger(argv.log);

const api = new Api(`${argv.endpoint}:${argv.port}`);

const trx = {
  fromAddress: argv.coinbase,
  toAddress: '0x2',
  amount: 10
};

logger.info("Checking balances");
api.get(`balanceOf/${argv.coinbase}`)
  .then((res) => {
    logger.info(`Balance of: ${argv.coinbase} = ${JSON.stringify(res.data)}`);
  })
  .catch((error) => {
    logger.error(JSON.stringify(error.data));
  });

api.get(`balanceOf/${trx.toAddress}`)
  .then((res) => {
    logger.info(`Balance of: ${trx.toAddress} = ${JSON.stringify(res.data)}`);
  })
  .catch((error) => {
    logger.error(JSON.stringify(error.data));
  });

logger.info(`Creating transaction data ${JSON.stringify(trx)}`);
api.post('createTransaction', trx)
  .then((res) => {
    logger.info(`Latest block: ${JSON.stringify(res.data)}`);
  })
  .catch((error) => {
    logger.error(JSON.stringify(error.data));
  });

logger.info("Checking balances");
api.get(`balanceOf/${argv.coinbase}`)
  .then((res) => {
    logger.info(`Balance of: ${argv.coinbase} = ${JSON.stringify(res.data)}`);
  })
  .catch((error) => {
    logger.error(JSON.stringify(error.data));
  });

api.get(`balanceOf/${trx.toAddress}`)
  .then((res) => {
    logger.info(`Balance of: ${trx.toAddress} = ${JSON.stringify(res.data)}`);
  })
  .catch((error) => {
    logger.error(JSON.stringify(error.data));
  });
