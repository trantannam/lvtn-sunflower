const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductControllers');

router.get('/', productController.index)

module.exports = router;