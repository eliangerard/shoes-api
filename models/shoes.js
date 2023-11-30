const mongoose = require('mongoose')

const shoesSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  sizes: {
    type: [Number],
    required: true
  },
  colors: {
    type: [String],
    required: true
  },
  image: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Shoes', shoesSchema)