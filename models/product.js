const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: Number,
  shopId: String,
  _createdOn: {
    type: Date,
    default: Date.now(),
  }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = {
  ProductModel,
};
