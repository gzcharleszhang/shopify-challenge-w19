const { ProductModel } = require('../models/product');
const { ServerError } = require('../error');

module.exports = {
  // Create a new product
  create: (req, res, next) => {
    const { name, shopId, price } = req.body;
    if (!name) {
      next(new ServerError('Missing parameter: name'));
    }
    if (!shopId) {
      next(new ServerError('Missing parameter: shopId'));
    }
    if (!price) {
      next(new ServerError('Missing parameter: price'));
    }
    const parsedPrice = Number.parseFloat(price);
    if (Number.isNaN(parsedPrice)) {
      next(new ServerError('Invalid parameter: price is not a number'));
    }
    const newProduct = new ProductModel({
      name,
      shopId,
      price: parsedPrice.toFixed(2),
    });
    newProduct.save()
      .then(product => res.json({
        _id: product._id,
        name: product.name,
        shopId: product.shopId,
        price: product.price,
      }))
      .catch((err) => {
        next(new ServerError(err.ToString()));
      })
  },

  // Find all products
  fetchAll: (req, res, next) => {
    ProductModel.find({})
      .then((products) => {
        res.json(products);
      })
      .catch(() => {
        next(new ServerError('Cannot find products'));
      });
  },

  // Find a specific product by id
  fetch: (req, res, next) => {
    const { _id } = req.params;
    if (!_id) {
      next(new ServerError('Missing parameter: _id'));
    }
    ProductModel.findById(_id)
      .then(product => res.json(product))
      .catch(() => next(new ServerError('Cannot find product')));
  },

  // Update product
  update: (req, res, next) => {
    const { name, price, otherFields } = req.body;
    const { _id } = req.params;
    if (!name) {
      next(new ServerError('Missing parameter: name'));
    }
    if (!price) {
      next(new ServerError('Missing parameter: price'));
    }
    if (!_id) {
      next(new ServerError('Missing parameter: _id'));
    }
    const parsedPrice = Number.parseFloat(price);
    if (Number.isNaN(parsedPrice)) {
      next(new ServerError('Invalid parameter: price is not a number'));
    }
    ProductModel.findById(_id)
      .then((oldProduct) => {
        oldProduct = {
          ...oldProduct,
          name,
          price: parsedPrice.toFixed(2),
          otherFields,
        }
        return oldProduct.save();
      })
      .then(newProduct => res.json(newProduct))
      .catch(err => next(new ServerError(err.ToString())));
  },

  // delete product
  delete: (req, res, next) => {
    const { _id } = req.params;
    if (!_id) {
      next(new ServerError('Missing parameter: _id'));
    }
    ProductModel.findByIdAndRemove(_id)
      .then(product => res.json(product))
      .catch(err => next(new ServerError(err.ToString())));
  }

}
