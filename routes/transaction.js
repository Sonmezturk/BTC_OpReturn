const express = require('express');

const router = express.Router();

module.exports = class TransactionRouter {
  constructor(TransactionService) {
    this.transactionService = TransactionService;
  }

  getAllRoutes() {
    router.get('/:opReturnData', async (req, res, next) => {
      const { opReturnData } = req.params;
      const result = await this.transactionService.getTxDetail(opReturnData);
      res.send(result);
    });

    return router;
  }
};
