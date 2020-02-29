const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please add a first name']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Please add a last name'],
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = model('User', UserSchema)