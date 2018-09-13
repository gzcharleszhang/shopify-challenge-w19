const mongoose = require('mongoose');

const { Schema } = mongoose;

const lineItemSchema = new Schema({
  productId: String,
  quantities: Number,
  price: Number,
  _createdOn: {
    type: Date,
    default: Date.now(),
  }
});

const LineItemModel = mongoose.model('LineItem', lineItemSchema);

module.exports = {
  LineItemModel,
};
