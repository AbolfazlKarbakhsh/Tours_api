const AppError = require('../../utils/appError');

const handelJsonWebTokenError = err => {

  const message = `please login to system , your token expire ...`

  return new AppError(message, 401)
}
const handelValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message)

  const message = `invalid Input data. ${errors.join('. ')}`

  return new AppError(message, 400)
}

const handelDuplicaieFeildsDB = err => {
  const message = `Duplicaite feild value : please try again.`
  return new AppError(message, 400)
}

const handelCastErrorDB = err => {
  const message = `invalid ${err.path} : ${err.value}.`
  return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
  console.log(err)
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message
  })
}

const sendErrorProduction = (err, res) => {
  if (err.isOperitional) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    console.log('Error 💥', err);
    res.status(500).json({
      status: 'error',
      message: "somthing went very wrong"
    })
  }
}


module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'

  if (process.env.NODE_ENV == 'development') {

    sendErrorDev(err, res);

  } else if (process.env.NODE_ENV == 'production') {
    let error = err
    if (error.name === 'ValidationError') error = handelValidationErrorDB(error)
    if (error.name === 'CastError') error = handelCastErrorDB(error)
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'  ) error = handelJsonWebTokenError(error)
    if (error.code === 11000) error = handelDuplicaieFeildsDB(error);
    sendErrorProduction(error, res)
  }
  next()
}