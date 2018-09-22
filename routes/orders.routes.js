const express = require('express');

const router = express.Router();
const OrderController = require('../controllers/orders.controller');

router.post('/', OrderController.create);

router.get('/', OrderController.fetchAll);

router.get('/:_id', OrderController.fetch);

router.delete('/:_id', OrderController.delete);

module.exports = router;
