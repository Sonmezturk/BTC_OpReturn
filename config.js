module.exports = {
  RPC_CLIENT_CONFIG: {
    protocol: 'http',
    host: process.env.RPC_HOST,
    user: process.env.RPC_USER,
    pass: process.env.RPC_PASS,
    port: process.env.RPC_PORT,
  },
  ZMQ_URL: process.env.ZMQ_URL,
  DB_CONFIG: {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB_NAME,
    synchronize: true,
    entities: [require('./entity/transactions')],
  },
};
