const { hexToString } = require('../util/convertion');

module.exports = class TransactionService {
  constructor(TxRepository) {
    this.txRepository = TxRepository;
  }

  async getTxDetail(opCode) {
    const txDetails = await this.txRepository.findOpCode(opCode);
    return txDetails.map((txDetail) => ({
      blockHash: txDetail.block_hash,
      transactionHash: txDetail.transaction_hash,
      plainTextOfOpCode: hexToString(txDetail.hex_of_OP_code),
    }));
  }

  async insertTx(txDetail) {
    return this.txRepository.insertTxBulk(txDetail);
  }

  async findLatestTx() {
    return this.txRepository.findLatestHeight();
  }
};
