const mongoose = require('mongoose');

const { Schema } = mongoose;

const shopSchema = new Schema({
  name: String,
  _createdOn: {
    type: Date,
    default: Date.now(),
  }
});

const ShopModel = mongoose.model('Shop', shopSchema);

module.exports = {
  ShopModel,
};
