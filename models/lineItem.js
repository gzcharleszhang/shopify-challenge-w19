const mongoose = require('mongoose');

const { Schema } = mongoose;

const lineItemSchema = new Schema({
  productId: String,
  orderId: String,
  quantity: Number,
  amount: Number,
  _createdOn: {
    type: Date,
    default: Date.now(),
  }
});

const LineItemModel = mongoose.model('LineItem', lineItemSchema);

module.exports = {
  LineItemModel,
};
