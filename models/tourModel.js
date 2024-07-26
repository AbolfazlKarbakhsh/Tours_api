const mongoose = require("mongoose")

// create schema 
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: [true, "unique value ..."],
    required: [true, "A tour most have name"]
  },
  duration: {
    type: Number,
    required: [true, "please inter a duration"]
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  maxGroupSize: {
    type: Number,
    required: [true, "please inter a maxGroupSize"]
  },
  difficulty: {
    type: String,
    trim: true,
    required: [true, "please inter a difficulty"]
  },
  price: {
    type: Number,
    required: [true, "A tour most have price"]
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "A tour most have description"]
  },
  imageCover: {
    type: String,
    required: [true, "A tour most have imageCover"]
  },
  images: [String],
  createAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
})
// create model 
const Tour = mongoose.model("Tour", tourSchema)
// const newTour = new Tour({})

module.exports = Tour;