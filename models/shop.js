const mongoose = require('mongoose');

const { Schema } = mongoose;

const shopSchema = new Schema({
  productIds: Array,
  orderIds: Array,
  _createdOn: {
    type: Date,
    default: Date.now(),
  }
});

const ShopModel = mongoose.model('Shop', shopSchema);

module.exports = {
  ShopModel,
};
