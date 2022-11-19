const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartControllers');

router.get('/getcart', cartController.getCart);
router.post('/createCart', cartController.createCart);
router.post('/addcart', cartController.addToCart);
router.post('/updatecart', cartController.updateCart);
router.delete('/deletecart', cartController.deleteCart);


module.exports = router;