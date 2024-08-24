const Tour = require('./../models/tourModel')
const catchAsyinc = require('../utils/catchAysinc');
const factory = require("../controllers/app/factory");



exports.aliasTopTour = catchAsyinc(async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.feilds = 'name,price,price,summary,difficulty';
  next()
});

exports.getTours = factory.getALL(Tour , { path: 'reviews' });
exports.getOneTours = factory.getOne(Tour, { path: 'reviews' });
exports.createTours = factory.createOne(Tour);
exports.patchTours = factory.updateOne(Tour);
exports.deleteTours = factory.deleteOne(Tour);