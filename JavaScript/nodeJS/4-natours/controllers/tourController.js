const Tour = require("./../models/tourModel");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price"
    });
  }
  next();
};

// Handler Function
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success"
    // results: tours.length, // when we're sending an array
    // data: {
    //   tours
    // }
  });
};

exports.getTour = (req, res) => {
  // req.params : parameters that we defined in the url (ex. /:id)
  // optional params : add ? in the end (ex. /:id?)
  // console.log(req.params); // ex. { id: '5' }

  const id = req.params.id * 1; // js trick to convert string as num
  // const tour = tours.find(el => el.id === id);

  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour
  //   }
  // });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: "success"
    // data: { tour: newTour }
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>"
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    // 204 : no content
    status: "success",
    data: null
  });
};
