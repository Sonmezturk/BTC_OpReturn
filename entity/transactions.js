const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Transaction',
  tableName: 'transactions',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    hex_of_OP_code: {
      type: 'text',
    },
    block_hash: {
      type: 'text',
    },
    transaction_hash: {
      type: 'text',
    },
    block_height: {
      type: 'int',
    },
  },
});
