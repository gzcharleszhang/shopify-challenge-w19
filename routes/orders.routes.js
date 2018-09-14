const express = require('express');

const router = express.Router();
const OrderController = require('../controllers/products.controller');

router.post('/', OrderController.create);

router.get('/', OrderController.fetchAll);

router.get('/:_id', OrderController.fetch);

router.put('/:_id', OrderController.update);

router.delete('/:_id', OrderController.delete);

module.exports = router;
