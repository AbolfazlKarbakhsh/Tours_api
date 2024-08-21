const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel');
const catchAsyinc = require('../utils/catchAysinc');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  })
}

exports.signup = catchAsyinc(async (req, res, next) => {

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    role: req.body.role,
    password: req.body.password,
    RePassword: req.body.RePassword,
  })
  newUser.password = undefined;
  newUser.__v = undefined;

  const token = signToken(newUser._id)


  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    }
  })
})

exports.protect = catchAsyinc(async (req, res, next) => {
  // geting token and cheack of its there 
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('you are not logged in app', 401))
  }

  // verification  token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  // cheack if user exites
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next(new AppError('you are not logged in app', 401))

  // cheack if user changed password after  the jwt issud

  if (await freshUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError('user recntlly changed password please login again.', 401))
  }

  req.user = freshUser;
  next()
})

exports.login = catchAsyinc(async (req, res, next) => {
  const { email, password } = req.body;
  // cheack email and password
  if (!email || !password) {
    return next(new AppError('email or password is corect !', 400))
  }

  // cheack user exites && password is HTMLFormControlsCollection
  const user = await User.findOne({ email }).select('+password');
  const correct = await user.correctPassword(password, user.password)

  if (!user || !correct) {
    return next(new AppError('email or password is corect !', 401))
  }

  // ok , send token

  const token = signToken(user._id)

  res.status(200).json({
    status: 'succsess',
    token
  })

})

exports.restrictTo = (...roles) => {
  return catchAsyinc(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Yo do not have permition to perfom this action', 403))
    }
    next()
  })
}

exports.forgetPassword = catchAsyinc(async (req, res, next) => {
  // get user based posted email 
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('there is no user with email address', 404))
  }
  // generaite random token 
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false })

  res.status(200).json({
    status: 'succsess',
    resetToken
  })
})

exports.resetPassword = catchAsyinc(async (req, res, next) => {
})

