const express = require('express');
const router = express.Router();

const paymentController = require('../app/controllers/PaymentController');

router.post('/create-url', paymentController.vnpay);

module.exports = router;