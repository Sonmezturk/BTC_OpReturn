const prepareDbObject = (blockDetail) => {
  const dbObjects = [];
  blockDetail.tx.forEach((txDetail) => {
    txDetail.vout.forEach((voutDetail) => {
      if (voutDetail.scriptPubKey.hex.substring(0, 2) === '6a') {
        const remainingOpCodeLengthInHex = voutDetail.scriptPubKey.hex.substring(2, 4);
        const opCodeLength = parseInt(remainingOpCodeLengthInHex, 16);
        const opCode = voutDetail.scriptPubKey.hex.substring(4, opCodeLength * 2 + 4);
        dbObjects.push({
          hex_of_OP_code: opCode.toString(),
          block_hash: blockDetail.hash,
          transaction_hash: txDetail.txid,
          block_height: blockDetail.height,
        });
      }
    });
  });
  return dbObjects;
};

module.exports = { prepareDbObject };
