const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductControllers');

router.post('/', productController.addProduct);
router.get('/', productController.index);
router.get('/:id', productController.getProductById);


module.exports = router;