module.exports = class TransactionsRepository {
  constructor(db) {
    this.transactionEntity = db.getRepository('Transaction');
  }

  async findOpCode(hash) {
    return this.transactionEntity.find({
      where: {
        hex_of_OP_code: hash,
      },
    });
  }

  async findLatestHeight() {
    const [latestTxDetail] = await this.transactionEntity.find({
      order: { block_height: 'DESC' },
      limit: 1,
    });
    return latestTxDetail?.block_height || 0;
  }

  async insertTxBulk(txs) {
    return this.transactionEntity.insert(txs);
  }
};
