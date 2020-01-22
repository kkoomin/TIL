const express = require("express");
const tourController = require("../controllers/tourController");
const router = express.Router();

// This middleware is only specified on this router. (Param Middleware)
router.param("id", tourController.checkID);

// Router
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
