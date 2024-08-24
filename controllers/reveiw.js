const Reveiw = require('../models/rewiewModel')
const factory = require("../controllers/app/factory");

exports.setTourUserId = (req, res, next) => {
  if(!req.body.tour) req.body.tour = req.params.tourId;
  if(!req.body.user) req.body.user = req.user.id;
  next()
};

exports.getReveiw = factory.getALL(Reveiw);
exports.getOneReveiw = factory.getOne(Reveiw);
exports.createReveiw = factory.createOne(Reveiw);
exports.patchReveiw = factory.updateOne(Reveiw);
exports.deleteReveiw = factory.deleteOne(Reveiw);