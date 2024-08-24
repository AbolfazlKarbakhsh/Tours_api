const express = require("express");
const app = express();
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')

const swaggerDocument = require('./swagger-output.json');
const AppError = require('./utils/appError')
const tourRoute = require("./routes/tours");
const userRoute = require(`./routes/users`);
const reveiwRoute = require(`./routes/reveiw`);
const golbalErrorHandler = require('./controllers/app/errorController.js');
app.use(helmet())

// const limiter = rateLimit({
//   max:1000,
//   window:60 * 60 * 100,
//   message: 'to mant request this ip'
// })
// app.use('/api',limiter)
app.use(morgan('dev'))
app.use(express.json());

// routers connect
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reveiwRoute);


//swagerUi 
// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// notFoundPage
app.use('*', (req, res, next) => {
  next(new AppError(`cant find : ${req.originalUrl}  plesae try again!`, 404))
})
// error handeler
app.use(golbalErrorHandler)

module.exports = app;