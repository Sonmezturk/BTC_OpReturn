The purpose of this project is to store and index Bitcoin OP_RETURN data for all transactions in the signet blockchain. This data will then be served on an HTTP endpoint as a JSON payload.


### 1. How can you run signet with bitcoind

https://en.bitcoin.it/wiki/Signet#Custom_Signet

I followed these two steps
1) Fetch and compile signet
2) Create bitcoin.conf file and start up the daemon
```
./bitcoind -datadir=signet -rpcuser=user -rpcpassword=pass -zmqpubhashblock=tcp://127.0.0.1:3001
```

### 2. Run Postgres

### Example config.js To Run The Project
```
  RPC_CLIENT_CONFIG: {
    protocol: 'http',
    host: '127.0.0.1',
    user: 'user',
    pass: 'pass',
    port: 38332,
  },
  ZMQ_URL: 'tcp://127.0.0.1:3001',
  DB_CONFIG: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'test',
    synchronize: true,
    entities: [require('./entity/transactions')],
  },
```

## How to run the code?
1) ``` npm run start:migration``` It will get all transactions from Signet then save if transaction has OP_RETURN 
2) ``` npm run start``` It will check if there is a missing block during bootstrap and a zeromq connection will be established to keep the database up to date.




