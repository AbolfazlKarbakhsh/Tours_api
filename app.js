const express = require("express");
const app = express();
app.use(express.json());

// routers connect
app.use("/tours" , require("./routes/tours"));



module.exports = app;