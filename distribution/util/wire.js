global.toLocal = new Map();
const id = require("../util/id");
const local = require("../local/local");
function createRPC(func) {
  global.toLocal.set(id.getID(func), func);
  let idd = id.getID(func);
  // let METHOD_ID = global.toLocal.get(func);
  function stub(...args) {
    let cb = args.pop();
    let remote = {
      node: global.config,
      service: idd,
      method: "call",
    };
    local.comm.send(args, remote, cb);
  }
  // serialization
  //   .serialize(stub)
  //   .replace("'__NODE_INFO__'", node)
  //   .replace("__METHOD_ID__", METHOD_ID);
  return stub;
}

/*
    The toAsync function converts a synchronous function that returns a value
    to one that takes a callback as its last argument and returns the value
    to the callback.
*/
function toAsync(func) {
  return function (...args) {
    const callback = args.pop() || function () {};
    try {
      const result = func(...args);
      callback(null, result);
    } catch (error) {
      callback(error);
    }
  };
}

module.exports = {
  createRPC: createRPC,
  toAsync: toAsync,
};
