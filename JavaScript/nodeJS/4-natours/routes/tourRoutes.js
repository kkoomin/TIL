const express = require("express");
const tourController = require("../controllers/tourController");
const router = express.Router();

// This middleware is only specified on this router. (Param Middleware)
//// router.param("id", tourController.checkID);

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

// Router
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
// .post(<first middleware>, <second middleware>) : we can chain middlewares.

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
