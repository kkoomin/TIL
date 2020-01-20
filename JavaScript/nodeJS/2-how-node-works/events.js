const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super(); // need to do when we extends a superclass
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
}); // event listener (observer)

myEmitter.on("newSale", () => {
  console.log("Customer name : Jonas");
}); // event listener (observer)

myEmitter.on("newSale", stock => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 9); // new event (emitter)

////////////////////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received!"); // send res
});
server.on("request", (req, res) => {
  console.log("Another Request!");
  res.end("Another Request!");
});
server.on("close", () => {
  console.log("Server closed!");
});

// start the server
server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
