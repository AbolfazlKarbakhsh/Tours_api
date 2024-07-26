const express = require("express");
const app = express();
const morgan = require('morgan')
app.use(express.json());
morgan('')



// routers connect
app.use("/tours" , require("./routes/tours"));



module.exports = app;