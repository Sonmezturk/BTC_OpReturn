module.exports = async (rpcClient, functionName, ...args) => new Promise((resolve, reject) => {
  if (args?.length) {
    rpcClient[functionName](...args, (error, data) => {
      if (error) return reject(error);
      resolve(data?.result);
    });
  } else {
    rpcClient[functionName]((error, data) => {
      if (error) return reject(error);
      resolve(data?.result);
    });
  }
});
