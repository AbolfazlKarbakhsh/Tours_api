const User = require('../models/UserModel')
const catchAsyinc = require('../utils/catchAysinc');
const AppError = require('../utils/appError');
const factory = require("../controllers/app/factory");


const filterObj = (obj, ...allowedFeilds) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFeilds.includes(el)) {
      newObj[el] = obj[el]
    }
  })
  return newObj
}

exports.getMe = (req, res, next) => {

  req.params.id = req.user.id;

  next()
}

exports.updateMe = catchAsyinc(async (req, res, next) => {
  const { password, RePassword } = req.body;
  // 1  create error if user posts password data
  if (password || RePassword) {
    return next(new AppError("dont send password and RePassword in update", 400));
  }
  //update use document
  const fillterdBody = filterObj(req.body, 'name', 'email')
  const updateUser = await User.findByIdAndUpdate(req.user._id, fillterdBody, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    data: updateUser
  })
})

exports.deleteMe = catchAsyinc(async (req, res, next) => {

  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: 'success delete account',
    data: null
  })
})

exports.getUsers = factory.getALL(User)
exports.getOneUsers = factory.getOne(User)
exports.createUsers = factory.createOne(User)
exports.patchUsers = factory.updateOne(User);
exports.deleteUsers = factory.deleteOne(User);