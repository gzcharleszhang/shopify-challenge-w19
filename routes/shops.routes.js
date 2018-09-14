const express = require('express');

const router = express.Router();
const ShopController = require('../controllers/shops.controller');

router.post('/', ShopController.create);

router.get('/', ShopController.fetchAll);

router.get('/:_id', ShopController.fetch);

router.put('/:_id', ShopController.update);

router.delete('/:_id', ShopController.delete);

module.exports = router;
