const User = require('../models/UserModel')
const APIFeatears = require('../utils/ApiFeacters');
const catchAsyinc = require('../utils/catchAysinc');
const AppError = require('../utils/appError');
const filterObj = (obj, ...allowedFeilds) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFeilds.includes(el)) {
      newObj[el] = obj[el]
    }
  })
  return newObj
}


exports.getUsers = catchAsyinc(async (req, res, next) => {
  // Exicute Query
  console.log("test");
  const featurs = new APIFeatears(User.find(), req.query)
    .filter()
    .sort()
    .limited()
    .pagination()

  const Users = await featurs.query;

  res.status(200).json({
    message: "success connect",
    resualtCount: Users.length,
    data: Users,
  });

})

exports.getOneUsers = catchAsyinc(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // User.findOne( {_id : req.params.id});
  if (user == null) {
    return next(new AppError("no user found with that Id", 404))
  }
  res.status(200).json({
    message: "success connect",
    data: user,
  });
})

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

exports.createUsers = catchAsyinc(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(200).json({
    message: "success create",
    data: newUser,
  });

})

exports.patchUsers = catchAsyinc(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
  if (user == null) {
    return next(new AppError("no user found with that Id", 404))
  }
  res.status(200).json({
    message: "success update",
    data: user,
  });
})

exports.deleteUsers = catchAsyinc(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user == null) {
    return next(new AppError("no user found with that Id", 404))
  }
  res.status(200).json({
    message: "success delete",
    data: null
  });
})