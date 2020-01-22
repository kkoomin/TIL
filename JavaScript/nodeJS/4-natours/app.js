const express = require("express");
// express will add a bunch of methods to our app variable upon calling.
const morgan = require("morgan"); // HTTP request logger
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});

// Mounting the router
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
