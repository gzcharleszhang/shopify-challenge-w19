const express = require('express');

const router = express.Router();
const OrderController = require('../controllers/products.controller');

router.post('/create', OrderController.create);

router.get('/fetchAll', OrderController.fetchAll);

router.get('/fetch/:_id', OrderController.fetch);

router.put('/update/:_id', OrderController.update);

router.delete('/fetch/:_id', OrderController.delete);

module.exports = router;
