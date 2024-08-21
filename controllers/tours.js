const Tour = require('./../models/tourModel')
const APIFeatears = require('../utils/ApiFeacters');
const catchAsyinc = require('../utils/catchAysinc');
const AppError = require('../utils/appError');



exports.aliasTopTour = catchAsyinc(async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.feilds = 'name,price,price,summary,difficulty';
  next()
});

exports.getTours = catchAsyinc(async (req, res, next) => {
  const featurs = new APIFeatears(Tour.find(), req.query)
    .filter()
    .sort()
    .limited()
    .pagination()
  // .addCustomFilter("name", { $regex: req.query.name, $options: 'i' })

  const tours = await featurs.query;

  res.status(200).json({
    message: "success connect",
    resualtCount: tours.length,
    data: tours,
  });
});

exports.getOneTours = catchAsyinc(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  // Tour.findOne( {_id : req.params.id});
  if (tour == null) {
    return next(new AppError("no tour found with that Id", 404))
  }
  res.status(200).json({
    message: "success connect",
    data: tour,
  });

});

exports.createTours = catchAsyinc(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(200).json({
    message: "success create",
    data: newTour,
  });
});

exports.patchTours = catchAsyinc(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (tour == null) {
    return next(new AppError("no tour found with that Id", 404))
  }
  res.status(200).json({
    message: "success update",
    data: tour,
  });

});

exports.deleteTours = catchAsyinc(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id)
  if (tour == null) {
    return next(new AppError("no tour found with that Id", 404))
  }
  res.status(200).json({
    message: "success delete",
    data: null
  });
});