const express = require('express');

const router = express.Router();
const ShopController = require('../controllers/shops.controller');

router.post('/create', ShopController.create);

router.get('/fetchAll', ShopController.fetchAll);

router.get('/fetch/:_id', ShopController.fetch);

router.put('/update/:_id', ShopController.update);

router.delete('/fetch/:_id', ShopController.delete);

module.exports = router;
