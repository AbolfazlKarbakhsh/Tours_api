const express = require("express");
const router = express.Router();
const ContollerUser = require("../controllers/users");
const ContollerAuth = require("../controllers/app/authContoller");


router.post('/signup', ContollerAuth.signup)
router.post('/login', ContollerAuth.login)
router.post('/forgetPassword', ContollerAuth.forgetPassword)
router.post('/resetPassword', ContollerAuth.resetPassword)


router.patch('/updateMe', ContollerAuth.protect, ContollerUser.updateMe);
router.patch('/deleteMe', ContollerAuth.protect, ContollerUser.deleteMe);
router.get('/getMe', ContollerAuth.protect, ContollerUser.getMe , ContollerUser.getOneUsers);


router.route("/")
  .get(ContollerAuth.protect, ContollerUser.getUsers)
  .post(ContollerAuth.protect, ContollerUser.createUsers);

router.route("/:id")
  .get(ContollerUser.getOneUsers)
  .patch(ContollerAuth.protect, ContollerUser.patchUsers)
  .delete(ContollerAuth.protect, ContollerUser.deleteUsers);



module.exports = router;