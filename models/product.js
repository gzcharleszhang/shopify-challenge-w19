const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: Number,
  _createdOn: {
    type: Date,
    default: Date.now(),
  }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = {
  ProductModel,
};
