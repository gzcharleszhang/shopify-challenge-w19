const { ProductModel } = require('../models/product');
const { LineItemModel } = require('../models/lineItem');
const { OrderModel } = require('../models/order');
const { ServerError } = require('../error');

module.exports = {
  // Create a new order
  create: (req, res, next) => {
    const { name, shopId, lineItems } = req.body;
    if (!name) {
      next(new ServerError('Missing parameter: name'));
    }
    if (!shopId) {
      next(new ServerError('Missing parameter: shopId'));
    }
    if (!lineItems || lineItems.length === 0) {
      next(new ServerError('Order does not have any line items'));
    }

    let totalAmount = 0;
    const getAmountPromises = lineItems.map((item) => {
      const { productId, quantity } = item;
      if (!productId) {
        next(new ServerError('Line item does not have product id'));
      }
      if (!quantity) {
        next(new ServerError('Line item does not have quantity'));
      }

      const parsedQuantity = Number.parseInt(quantity);
      if (Number.isNaN(parsedQuantity)) {
        next(new ServerError('Quantity is not a valid integer'));
      }

      return ProductModel.findById(productId)
        .then((product) => {
          const amount = product.price * parsedQuantity;
          totalAmount += amount;
          return new LineItemModel({
            ...item,
            amount,
          });
        })
        .catch(() => next(new ServerError('Product does not exist')));
    });

    Promise.all(getAmountPromises).then((lineItems) => {
      const newOrder = new OrderModel({
        amount: totalAmount,
        shopId,
      });

      newOrder.save()
        .then((order) => {
          const createItemPromises = lineItems.map((item) => {
            item.orderId = order._id;
            return item.save();
          })

          Promise.all(createItemPromises)
            .then(newItems => res.json({
              ...order,
              newItems,
            }));
        })
        .catch((err) => next(new ServerError(err.toString())))
    })
  },

  // Find all orders
  fetchAll: (req, res, next) => {
    OrderModel.find({})
      .then((orders) => Promise.all(orders.map((order) => {
        const { _id } = order;
        return LineItemModel.find({ orderId: _id })
          .then(items => ({
            ...order,
            items,
          }))
      })))
      .then(orders => res.json(orders))
      .catch(() => {
        next(new ServerError('Cannot find orders'));
      });
  },

  // Find a specific order by id
  fetch: (req, res, next) => {
    const { _id } = req.params;
    if (!_id) {
      next(new ServerError('Missing parameter: _id'));
    }
    OrderModel.findById(_id)
      .then((order) => {
        LineItemModel.find({ orderId: order._id })
          .then(items => res.json({
            ...order,
            items,
          }))
      })
      .catch(() => next(new ServerError('Cannot find order')));
  },

  // delete order
  delete: (req, res, next) => {
    const { _id } = req.params;
    if (!_id) {
      next(new ServerError('Missing parameter: _id'));
    }
    OrderModel.findByIdAndRemove(_id)
      .then(order => res.json(order))
      .catch(err => next(new ServerError(err.toString())));
  }

}
