const http = require("http");

const serialization = require("../util/serialization");
const id = require("../util/id");

const node = global.config;

/*

Service  Description                           Methods
status   statusrmation about the current node  get
routes   A mapping from names to functions     get, put
comm     A message communication interface     send

*/
global.count = 0;
global.map = new Map();
const status = {
  get: function (name, callBackfunc) {
    if (name === "nid") {
      callBackfunc(null, id.getNID(node));
    } else if (name === "sid") {
      callBackfunc(null, id.getSID(node));
    } else if (name === "ip") {
      callBackfunc(null, global.config.ip);
    } else if (name === "port") {
      callBackfunc(null, global.config.port);
    } else if (name == "counts") {
      callBackfunc(null, global.count);
    } else {
      callBackfunc(new Error("message"), null);
    }
  },
};

const routes = {
  get: function (name, callBackfunc) {
    //global map??
    if (global.map.has(name)) {
      callBackfunc(null, map.get(name));
    } else if (global.toLocal.has(name)) {
      callBackfunc(null, { call: global.toLocal.get(name) });
    } else {
      callBackfunc(new Error("not found"), null);
    }
  },
  put: function (service, name, callBackfunc) {
    callBackfunc(null, global.map.set(name, service));
  },
};
// option = host, port, localadd, method:put , path, "////"

const comm = {
  send: function (message, remote, callback) {
    // console.log(message, remote);
    global.count += 1;
    const options = {
      localAddress: node.ip,
      host: remote.node.ip,
      port: remote.node.port,
      // http://node_ip:node_port/service/method
      path: "/" + remote.service + "/" + remote.method,
      method: "PUT",
    };
    let store = "";
    const req = http.request(options, (res) => {
      res.on("data", (chunk) => {
        store = store + chunk;
      });
      res.on("end", () => {
        callback(...serialization.deserialize(store));
      });

      // Write data to request body
    });
    req.on("error", (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.write(serialization.serialize(message));
    req.end();
  },
};

const rpc = {};
global.map.set("status", status);
global.map.set("routes", routes);
global.map.set("comm", comm);

module.exports = { status: status, routes: routes, comm: comm };
