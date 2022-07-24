const connectDb = require('./db-connection');
const checkAndPullLatestBlock = require('./migration/start-migration');
const zmqConnection = require('./zmq-connection');

const TransactionsRepository = require('./repository/transactions');
const TransactionService = require('./service/transaction');
const TransactionRouter = require('./routes/transaction');
const runServer = require('./server');

async function setup() {
  const dbClient = await connectDb();
  const transactionsRepository = new TransactionsRepository(dbClient);
  const transactionService = new TransactionService(transactionsRepository);
  await checkAndPullLatestBlock();
  await zmqConnection(transactionService);
  const transactionRouter = new TransactionRouter(transactionService);
  const transactionRoutes = transactionRouter.getAllRoutes(transactionService);
  runServer(transactionRoutes);
}
setup();
