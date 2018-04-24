require('dotenv').config();
const Logger = require('./lib/logger');

const argv = require('yargs')
  .option('log', {
    alias: 'l',
    describe: 'log level for logger. ',
    default:  process.env.LOG_LEVEL
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

const Service = require('./service/service.js');
new Service(argv);
