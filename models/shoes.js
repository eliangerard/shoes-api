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
  price: {
    type: Number,
    required: true
  },
  sizes: {
    type: [Number],
    required: true
  },
  images: {
    type: [String],
    required: false
  },
  description: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Shoes', shoesSchema)