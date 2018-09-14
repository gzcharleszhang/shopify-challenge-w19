const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/products.controller');

router.post('/', ProductController.create);

router.get('/', ProductController.fetchAll);

router.get('/:_id', ProductController.fetch);

router.put('/:_id', ProductController.update);

router.delete('/:_id', ProductController.delete);

module.exports = router;
