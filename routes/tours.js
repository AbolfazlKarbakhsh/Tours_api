const express = require("express")
const router = express.Router()
const ContollerTour = require("../controllers/tours")


router.route("/").get(ContollerTour.getTours).post(ContollerTour.postTours);
router.route("/:id").get(ContollerTour.getOneTours).patch(ContollerTour.patchTours).delete(ContollerTour.deleteTours);



module.exports = router;