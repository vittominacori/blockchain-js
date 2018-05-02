const SHA256 = require("crypto-js/sha256");

class Block
{
  constructor (blockNumber, transactions, previousHash = '', coinbase = 0, miningReward = 0) {
    this.blockNumber = blockNumber;
    this.previousHash = previousHash;
    this.timestamp = Date.now();
    this.transactions = transactions;
    this.coinbase = coinbase;
    this.miningReward = miningReward;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash () {
    return SHA256(
      this.blockNumber +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.nonce
    ).toString();
  }

  mineBlock (difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    logger.info("Block mined: " + this.hash);
  }
}

module.exports = Block;
