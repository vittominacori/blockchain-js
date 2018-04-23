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
  .help('help')
  .argv;

global.logger = new Logger(argv.log);

const api = new Api(`${argv.endpoint}:${argv.port}`);

const trx = {
  fromAddress: '0x1',
  toAddress: '0x2',
  amount: 10
};

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
