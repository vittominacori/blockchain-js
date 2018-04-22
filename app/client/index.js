require('dotenv').config();

const io = require('socket.io-client');

const argv = require('yargs')
  .option('endpoint', {
    alias: 'e',
    describe: 'endpoint for socket listening. ',
    default:  process.env.SOCKET_ENDPOINT
  })
  .option('port', {
    alias: 'p',
    describe: 'port for socket listening. ',
    default:  process.env.SOCKET_PORT
  })
  .help('help')
  .argv;

const socket = io.connect(`${argv.endpoint}:${argv.port}`);

const trx = {
  fromAddress: '0x1',
  toAddress: '0x2',
  amount: 10
};
console.log(`Calling 'createTransaction' with data ${JSON.stringify(trx)}`);
socket.emit('createTransaction', trx);
setTimeout(() => {
  socket.close();
}, 2000);