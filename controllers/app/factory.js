const APIFeatears = require("../../utils/ApiFeacters");
const AppError = require("../../utils/appError");
const catchAsyinc = require("../../utils/catchAysinc")


exports.deleteOne = Model => (catchAsyinc(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id)
  if (doc == null) {
    return next(new AppError("no document found with that Id", 404))
  }
  res.status(200).json({
    message: "success delete",
    data: null
  });
}))
exports.updateOne = Model => (
  catchAsyinc(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (doc == null) {
      return next(new AppError("no document found with that Id", 404))
    }
    res.status(200).json({
      message: "success update",
      data: doc,
    });

  })
)
exports.createOne = Model => (
  catchAsyinc(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(200).json({
      message: "success create",
      data: newDoc,
    });
  })
)
exports.getOne = (Model, populateOptions) => (
  catchAsyinc(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions)

    const doc = await query;

    if (doc == null) {
      return next(new AppError("no document found with that Id", 404))
    }
    res.status(200).json({
      message: "success connect",
      data: doc,
    });
  })
)

exports.getALL = (Model, populateOptions) => (
  catchAsyinc(async (req, res, next) => {
    let query = Model.find()
    if(populateOptions) query = query.populate(populateOptions);

    const featurs = new APIFeatears( query, req.query)
      .filter()
      .sort()
      .limited()
      .pagination()

    const doc = await featurs.query;

    res.status(200).json({
      message: "success connect",
      resualtCount: doc.length,
      data: doc,
    });
  })
)
