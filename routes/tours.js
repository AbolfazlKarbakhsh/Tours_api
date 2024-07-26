const express = require("express")
const router = express.Router()
const ContollerTour = require("../controllers/tours")

// router.param('id' , (req , res , next ,val) => {
//   console.log(val)
//   console.log(req.params)
//    return  res.json({a:"10"})
//    next()
// })

router.route("/")
.get(ContollerTour.getTours)
.post(ContollerTour.createTours);

router.route("/:id")
.get(ContollerTour.getOneTours)
.patch(ContollerTour.patchTours)
.delete(ContollerTour.deleteTours);



module.exports = router;