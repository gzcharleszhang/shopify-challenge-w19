const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  amount: Number,
  shopId: String,
  _createdOn: {
    type: Date,
    default: Date.now(),
  }
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = {
  OrderModel,
};
