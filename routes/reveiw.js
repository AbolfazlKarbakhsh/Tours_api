const express = require("express")
const reveiwController = require("../controllers/Reveiw")
const ContollerAuth = require("../controllers/app/authContoller");

const router = express.Router({ mergeParams: true })


router.route("/")
  .get(reveiwController.getReveiw)
  .post(
    ContollerAuth.protect,
    ContollerAuth.restrictTo('user'),
    reveiwController.setTourUserId,
    reveiwController.createReveiw
  );

router.route('/:id')
  .get(reveiwController.getOneReveiw)
  .delete(reveiwController.deleteReveiw)
  .patch(reveiwController.patchReveiw);



module.exports = router;