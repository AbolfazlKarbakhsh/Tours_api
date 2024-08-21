const crypto = require('crypto')
const mongoose = require("mongoose");
const validaitor = require('validator');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: [true, "unique value ..."],
    required: [true, "name not valid"]
  },
  email: {
    type: String,
    unique: [true, "unique value ..."],
    lowercase: true,
    required: [true, "email not valid"],
    validate: [validaitor.isEmail, 'please provide a vailid email']
  },
  photo: String,
  password: {
    type: String,
    minlength: 8,
    required: [true, "please provide a password"],
    select: false
  }, role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  RePassword: {
    type: String,
    required: [true, "please provide a RePassword"],
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: "password confirm eqalue to password"
    }
  },
  PasswordChangeAt: {
    type: Date,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  }

})
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.RePassword = undefined;
  next()
})


userSchema.methods.correctPassword = async function (caddiatePassword, userPasswor) {
  return await bcrypt.compare(caddiatePassword, userPasswor);
}


userSchema.methods.changePasswordAfter = async function (JWTtimeStamp) {
  if (this.PasswordChangeAt) {
    const changedTimeStamp = parseInt(this.PasswordChangeAt.getTime() / 1000, 10);
    return JWTtimeStamp < changedTimeStamp;
  }
  return false;
}


userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
}

userSchema.pre(/^find/ , function (next) {
  // this.find({active:{$nt:false}});
  next()
})


const User = mongoose.model("Users", userSchema);
module.exports = User;