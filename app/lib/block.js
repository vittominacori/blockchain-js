const SHA256 = require("crypto-js/sha256");

class Block
{
  constructor (timestamp, transactions, previousHash = '', coinbase = 0, miningReward = 0) {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.hash = this.calculateHash();
    this.hash = this.calculateHash();
    this.coinbase = coinbase;
    this.miningReward = miningReward;
    this.nonce = 0;
  }

  calculateHash () {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock (difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    // TODO add the reward
    logger.info("Block mined: " + this.hash);
  }
}

module.exports = Block;
