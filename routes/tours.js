const express = require("express")
const router = express.Router()
const ContollerTour = require("../controllers/tours")
const ContollerAuth = require("../controllers/app/authContoller");
const reviewRouter = require('../routes/reveiw')


router.use("/:tourId/review",  reviewRouter)

router.route('/top-5-cheap').get(ContollerTour.aliasTopTour, ContollerTour.getTours)

router.route("/")
  .get(ContollerTour.getTours)
  .post(ContollerTour.createTours);

router.route("/:id")
  .get(ContollerTour.getOneTours)
  .patch(ContollerTour.patchTours)
  .delete(
    ContollerTour.deleteTours
  );



module.exports = router;