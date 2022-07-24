const RpcClient = require('bitcoind-rpc');
const rpcHandler = require('../util/rpc-caller');
const { RPC_CLIENT_CONFIG } = require('../config');
const logger = require('../logger');
const connectDb = require('../db-connection');
const TransactionsRepository = require('../repository/transactions');
const { prepareDbObject } = require('../logic/op-code');

module.exports = async () => {
  const chunkSize = 10000;
  const rpc = new RpcClient(RPC_CLIENT_CONFIG);
  const dbConnection = await connectDb();
  const transactionsRepository = new TransactionsRepository(dbConnection);
  let bulkOperation = [];

  try {
    const highestBlockNumberOnDb = await transactionsRepository.findLatestHeight();
    const highestBlockNumberOnBlockchain = await rpcHandler(rpc, 'getblockcount');
    for (let i = highestBlockNumberOnDb + 1; i <= highestBlockNumberOnBlockchain; i++) {
      const blockHash = await rpcHandler(rpc, 'getblockhash', i);
      const blockDetail = await rpcHandler(rpc, 'getblock', blockHash, 2);
      bulkOperation.push(...prepareDbObject(blockDetail));
      if (bulkOperation.length >= chunkSize) {
        await transactionsRepository.insertTxBulk(bulkOperation);
        bulkOperation = [];
      }
    }
    if (bulkOperation.length > 0) {
      await transactionsRepository.insertTxBulk(bulkOperation);
    }
    logger.info(highestBlockNumberOnDb === highestBlockNumberOnBlockchain ? 'new block is not found'
      : `migration completed for ${highestBlockNumberOnBlockchain - highestBlockNumberOnDb} blocks`);
  } catch (e) {
    logger.error(e.message);
    throw e;
  }
};
