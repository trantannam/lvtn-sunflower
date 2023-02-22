const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartControllers');

router.post('/getcart', cartController.getCart);

module.exports = router;