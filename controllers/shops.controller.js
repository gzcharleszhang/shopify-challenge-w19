const { ShopModel } = require('../models/shop');
const { ServerError } = require('../error');

module.exports = {
  // Create a new shop
  create: (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      next(new ServerError('Missing parameter: name'));
    }
    const newShop = new ShopModel({
      name,
    });
    newShop.save()
      .then(shop => res.json({
        _id: shop._id,
        name: shop.name,
      }))
      .catch((err) => {
        next(new ServerError(err.toString()));
      })
  },

  // Find all shops
  fetchAll: (req, res, next) => {
    ShopModel.find({})
      .then((shops) => {
        res.json(shops);
      })
      .catch(() => {
        next(new ServerError('Cannot find shops'));
      });
  },

  // Find a specific shop by id
  fetch: (req, res, next) => {
    const { _id } = req.params;
    if (!_id) {
      next(new ServerError('Missing parameter: _id'));
    }
    ShopModel.findById(_id)
      .then(shop => res.json(shop))
      .catch(() => next(new ServerError('Cannot find shop')));
  },

  // Update shop
  update: (req, res, next) => {
    const { name, ...otherFields } = req.body;
    const { _id } = req.params;
    if (!name) {
      next(new ServerError('Missing parameter: name'));
    }
    if (!_id) {
      next(new ServerError('Missing parameter: _id'));
    }
    ShopModel.findById(_id)
      .then((oldShop) => {
        oldShop.set({ name, ...otherFields });
        return oldShop.save();
      })
      .then(newShop => res.json(newShop))
      .catch(err => next(new ServerError(err.toString())));
  },

  // delete shop
  delete: (req, res, next) => {
    const { _id } = req.params;
    if (!_id) {
      next(new ServerError('Missing parameter: _id'));
    }
    ShopModel.findByIdAndRemove(_id)
      .then(shop => res.json(shop))
      .catch(err => next(new ServerError(err.toString())));
  }

}
