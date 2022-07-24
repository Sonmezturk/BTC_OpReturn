const typeorm = require('typeorm');
const { DB_CONFIG } = require('./config');

const client = new typeorm.DataSource(DB_CONFIG);

let db;

module.exports = async () => {
  if (!client.isInitialized) {
    db = client.initialize();
  }

  return db;
};
