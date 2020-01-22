const fs = require("fs");
const express = require("express");
// express will add a bunch of methods to our app variable upon calling.
const morgan = require("morgan"); // HTTP request logger

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/*
 * Handler functions
 */
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length, // when we're sending an array
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  // req.params : parameters that we defined in the url (ex. /:id)
  // optional params : add ? in the end (ex. /:id?)
  // console.log(req.params); // ex. { id: '5' }

  const id = req.params.id * 1; // js trick to convert string as num
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour
    }
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: "success",
        data: { tour: newTour }
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>"
    }
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }
  res.status(204).json({
    // 204 : no content
    status: "success",
    data: null
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined"
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined"
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined"
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined"
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined"
  });
};

/*
 * Routes
 */
/* 
// Get all the tours
app.get("/api/v1/tours", getAllTours);

// Get a tour
app.get("/api/v1/tours/:id", getTour);

// Create a new tour
app.post("/api/v1/tours", createTour);

// Patch (update data)
app.patch("/api/v1/tours/:id", updateTour);

// Delete
app.delete("/api/v1/tours/:id", deleteTour);
*/

// Mounting the router
const tourRouter = express.Router();
const userRouter = express.Router();

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

tourRouter
  .route("/")
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

userRouter
  .route("/")
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

/*
 * Running Server
 */
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
