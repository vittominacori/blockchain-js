const axios = require('axios');

class Api {
  constructor (endpoint) {
    global.logger.info(`Initializing Api with endpoint ${endpoint} ...`);
    this.axios = axios.create({
      baseURL: endpoint,
    });
  };

  get (method, params = {}) {
    global.logger.debug(`Api.get to ${method} with params ${JSON.stringify(params)}`);
    return new Promise((resolve, reject) => {
      this.axios.get(method, { params: params })
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  post (method, params = {}) {
    global.logger.debug(`Api.post to ${method} with params ${JSON.stringify(params)}`);
    return new Promise((resolve, reject) => {
      this.axios.post(method, params)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };
}

module.exports = Api;
