const mongoose = require('mongoose')

const reveiwSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Reveiw can not be empty"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createAt: {
      type: Date,
      default: Date.now
    }, tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'reveiw most have a tour']
    }, user: {
      type: mongoose.Schema.ObjectId,
      ref: 'Users',
      required: [true, 'reveiw most have a Users']
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

reveiwSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour', select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // })
  this.populate({
    path: 'user',
    select: 'name photo'
  })
  next();
})
const Review = mongoose.model('Review', reveiwSchema)

module.exports = Review;