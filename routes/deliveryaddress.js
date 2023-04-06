const express = require('express');
const router = express.Router();

const dAController = require('../app/controllers/AddressDeliveryController');

router.post('/addAddress', dAController.addAddress);

module.exports = router;