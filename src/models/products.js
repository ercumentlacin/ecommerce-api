const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Products', productsSchema);
