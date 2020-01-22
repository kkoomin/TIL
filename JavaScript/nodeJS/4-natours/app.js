const fs = require("fs");
const express = require("express");
// express will add a bunch of methods to our app variable upon calling.
const morgan = require("morgan"); // HTTP request logger

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

/*
 * Middleware : a function that can modify the incoming request data.
 */
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});

// Mounting the router
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

/*
 * Running Server
 */
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
