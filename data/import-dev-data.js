const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fs = require("fs");
const Tour = require('./../models/tourModel');

dotenv.config({ path: './config.env' })

mongoose.connect(process.env.DATABASE_LOCAL).then(con => {
  console.log("databaseConnect Success")
}).catch(err => {
  console.log("databaseConnect Error")
})

// Read Json FIle
const tours =JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))


// import data
const importDate = async () => {
  try {
    await Tour.create(tours)
    console.log("dataSuccsessFuly Create");
    process.exit()
  } catch (err) {
    console.log(err);
  }
}
// ddlete data 
const deleteDate = async () => {
  try {
    await Tour.deleteMany()
    console.log("dataSuccsessFuly del all");
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

if (process.argv[2] === '--import') {
  importDate()
} else if (process.argv[2] === '--del') {
  deleteDate()
}