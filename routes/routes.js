const express = require('express');

const router = express.Router();

router.use('/shops', require('./shops.routes'));
router.use('/products', require('./products.routes'));
router.use('/orders', require('./orders.routes'));

module.exports = router;
