const express = require('express');
const router = express.Router();

const productTypeController = require('../app/controllers/ProductTypeControllers');

router.get('/', productTypeController.index)

module.exports = router;