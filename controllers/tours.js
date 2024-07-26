const Tour = require('./../models/tourModel')
// const fs = require("fs");
// let tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`, "utf-8"));

exports.getTours = async (req, res, next) => {
  try {
    const tours = await Tour.find({
      duration:req.query.duration
    });
    // const tours = await Tour.find().where('duration').equals(7).where('name').equals("")

    res.status(200).json({
      message: "success connect",
      resualtCount: tours.length,
      data: tours,
    });

  } catch (err) {
    res.status(400).json({
      message: "bad connect",
      data: null,
      erros: err
    });
  }
  next()
};

exports.getOneTours = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne( {_id : req.params.id});

    res.status(200).json({
      message: "success connect",
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      message: "bad connect",
      data: null,
      erros: err
    });
  }
  next()
};

exports.createTours = async (req, res, next) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(200).json({
      message: "success create",
      data: newTour,
    });

  } catch (err) {
    res.status(400).json({
      message: "در دریافت  دیتا از سمت کلاینت مشکلی پیش آمده است",
      data: null,
      errors: err,
    });
  }
  next()
};

exports.patchTours = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      message: "success update",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      message: "has problem",
      data: null,
      errors: err
    });
  }

  next()
};

exports.deleteTours = async (req, res, next) => {
  try {
     await Tour.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: "success delete",
      data:null
    });
  } catch (err) {
    res.status(404).json({
      message: "has problem",
      data: null,
      errors: err
    });
  }

  next()
};