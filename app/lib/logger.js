const log4js = require('log4js');

class Logger
{
  constructor (logLevel) {
    log4js.configure({
      appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'log/default.log' }
      },
      categories: {
        default: {
          appenders: ['file', 'console'],
          level: logLevel
        }
      }
    });

    return log4js.getLogger('default');
  };

}

module.exports = Logger;