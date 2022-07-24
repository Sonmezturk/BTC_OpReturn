const zmq = require('zeromq');
const RpcClient = require('bitcoind-rpc');
const { ZMQ_URL, RPC_CLIENT_CONFIG } = require('./config');
const rpcHandler = require('./util/rpc-caller');
const { prepareDbObject } = require('./logic/op-code');
const opReturn = require('./service/transaction');

const rpc = new RpcClient(RPC_CLIENT_CONFIG);

const sock = zmq.socket('sub');
sock.connect(ZMQ_URL);
sock.subscribe('hashblock');

module.exports = (transactionService) => {
  sock.on('message', async (topic, message) => {
    if (topic.toString() === 'hashblock') {
      const newBLockHash = message.toString('hex');
      const blockDetail = await rpcHandler(rpc, 'getblock', newBLockHash, 2);
      await transactionService.insertTx(prepareDbObject(blockDetail));
    }
  });
};
