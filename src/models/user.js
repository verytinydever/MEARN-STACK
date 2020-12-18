const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 4,
      max: 16,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 4,
      max: 16,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    hashPassword: {
      type: String,
      minlength: 6,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    phoneNumber: {
      type: Number,
      minlength: 10,
      required: true,
    },
    profileImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
userSchema.virtual('password').set(function (password) {
  this.hashPassword = bcrypt.hashSync(password, 10)
});

userSchema.virtual('fullName').get(function(){
  return `${this.firstName} ${this.lastName}`;
});
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hashPassword)
  },
}

module.exports = mongoose.model('User', userSchema)
