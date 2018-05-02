const Block = require('./block');

class Blockchain
{
  constructor (coinbase) {
    if (!coinbase) {
      logger.error('No coinbase set');
      process.exit();
    }

    logger.info(`Coinbase set to "${coinbase}"`);

    this.coinbase = coinbase ? coinbase : 0;
    this.miningReward = 100;
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
  }

  createGenesisBlock () {
    return new Block(
      0,
      [],
      "0",
      this.coinbase,
      this.miningReward
    );
  }

  getLatestBlock () {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions () {
    let block = new Block(
      this.chain.length,
      this.pendingTransactions,
      this.getLatestBlock().hash,
      this.coinbase,
      this.miningReward
    );
    block.mineBlock(this.difficulty);

    this.chain.push(block);
    this.pendingTransactions = [];
  }

  createTransaction (transaction) {
    if (transaction.amount < 0) {
      logger.error(`Transaction failed: amount must be greater or equal to 0, ${transaction.amount} given`);
      return false;
    }
    if (this.getBalanceOfAddress(transaction.fromAddress) < transaction.amount) {
      logger.error(`Transaction failed: "${transaction.fromAddress}" has not enough funds`);
      return false;
    }
    this.pendingTransactions.push(transaction);
    return true;
  }

  getBalanceOfAddress (address) {
    let balance = 0;

    for (const block of this.chain){
      for (const trans of block.transactions){
        if (trans.fromAddress === address){
          balance -= trans.amount;
        }

        if (trans.toAddress === address){
          balance += trans.amount;
        }
      }
      if (block.coinbase === address) {
        balance += block.miningReward;
      }
    }

    return balance;
  }

  isChainValid () {
    for (let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;
