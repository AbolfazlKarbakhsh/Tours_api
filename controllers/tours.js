const fs = require("fs");
let tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`, "utf-8"));

exports.getTours = (req, res) => {
  res.status(200).json({
    message: "success connect",
    timeRequset:req.RequestTime,
    resualtCount: tours.length,
    data: tours,
  });
};

exports.getOneTours = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((item) => item.id === id);

  if (!tour) {
    return res.status(404).json({
      message: "page 404",
      data: null,
    });
  }

  res.status(200).json({
    message: "success connect",
    data: tour,
  });
};

exports.postTours = (req, res) => {
  if (req.body.name && req.body.age) {
    tours.push({ ...req.body, id: tours.length + 1 });
    fs.writeFile(
      `${__dirname}/../data/data.json`,
      JSON.stringify(tours),
      (err, data) => {
        if (err == null) {
          res.status(200).json({
            message: "success create",
            data: tours,
          });
        } else {
          res.status(404).json({
            message: "در دریافت  دیتا از سمت سرور مشکلی پیش آمده است",
            data: null,
            errors: err,
          });
        }
      }
    );
  } else {
    res.status(404).json({
      message: "لطفا فیلد های نام وسن را پر کنید !",
      data: null,
      errors: "not found",
    });
  }
};

exports.patchTours = (req, res) => {
  if (req.params.id <= tours.length) {
    res.status(200).json({
      message: "success connect",
      data: "tour",
    });
  } else {
    res.status(404).json({
      message: "not found",
      data: "404",
    });
  }
};

exports.deleteTours = (req, res) => {
  if (req.params.id <= tours.length) {
    res.status(204).json({
      message: "success connect",
      data: null,
    });
  } else {
    res.status(404).json({
      message: "not found",
      data: "404",
    });
  }
};