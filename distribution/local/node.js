/*
    The start function will be called to start your node.
    It will take a callback as an argument.
    After your node has booted, you should call the callback.
*/
const http = require("http");
const url = require("url");
const local = require("../local/local");
const serialization = require("../util/serialization");
const start = function (started) {
  const server = http.createServer((req, res) => {
    /* Your server will be listening for PUT requests. */

    // Write some code...
    if (req.method !== "PUT") {
      // raise an error
    }

    /*
      The path of the http request will determine the service to be used.
      The url will have the form: http://node_ip:node_port/service/method
    */

    // Write some code...
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;
    const pathParts = pathname.split("/");
    // Assuming the URL format is /service/method
    const serviceName = pathParts[1];
    const method = pathParts[2];

    const node_ip = req.headers.host.split(":")[0];
    const node_port = req.headers.host.split(":")[1];
    console.log(
      //   parsedUrl,
      //   pathname,
      //   pathParts,
      serviceName,
      method,
      node_ip,
      node_port
    );
    /*

      A common pattern in handling HTTP requests in Node.js is to have a
      subroutine that collects all the data chunks belonging to the same
      request. These chunks are aggregated into a body variable.

      When the req.on('end') event is emitted, it signifies that all data from
      the request has been received. Typically, this data is in the form of a
      string. To work with this data in a structured format, it is often parsed
      into a JSON object using JSON.parse(body), provided the data is in JSON
      format.

      Our nodes expect data in JSON format.
  */

    // Write some code...
    let data = "";
    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      data = JSON.parse(data);
      const serviceCallback = (e, v) => {
        res.end(serialization.serialize([e, v]));
      };
      local.routes.get(serviceName, (error, service) => {
        // error catching
        if (error) {
          console.error(error);
        }

        service[method](...serialization.deserialize(data), serviceCallback);

        // do something with service
      });
    });
    /* Here, you can handle the service requests. */

    // Write some code...

    /*
      Here, we provide a default callback which will be passed to services.
      It will be called by the service with the result of it's call
      then it will serialize the result and send it back to the caller.
        */
  });

  /*
    Your server will be listening on the port and ip specified in the config
    You'll need to call the started callback when your server has successfully
    started.

    In this milestone, you'll be passing the server object to this callback
    so that we can close the server when we're done with it.
    In future milestones, we'll add the abilitiy to stop the node
    through the service interface.
  */

  server.listen(global.config.port, global.config.ip, () => {
    started(server);
  });
};

module.exports = {
  start: start,
};
