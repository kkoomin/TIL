const fs = require("fs");
const express = require("express");
// express will add a bunch of methods to our app variable upon calling.
const app = express();

// Middleware
// : a function that can modify the incoming request data.
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Get all the tours
// app.get(route, route handler)
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length, // when we're sending an array
    data: {
      tours
    }
  });
});

// Get a tour
app.get("/api/v1/tours/:id", (req, res) => {
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
});

// Create a new tour
app.post("/api/v1/tours", (req, res) => {
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
});

// Patch (update data)
app.patch("/api/v1/tours/:id", (req, res) => {
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
});

// Delete
app.delete("/api/v1/tours/:id", (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
