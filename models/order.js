const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  lineItemIds: Array,
  price: Number,
  _createdOn: {
    type: Date,
    default: Date.now(),
  }
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = {
  OrderModel,
};
