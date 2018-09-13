const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/products.controller');

router.post('/create', ProductController.create);

router.get('/fetchAll', ProductController.fetchAll);

router.get('/fetch/:_id', ProductController.fetch);

router.put('/update/:_id', ProductController.update);

router.delete('/fetch/:_id', ProductController.delete);

module.exports = router;
