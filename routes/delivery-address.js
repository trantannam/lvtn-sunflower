const express = require('express');
const router = express.Router();

const dAController = require('../app/controllers/AddressDeliveryController');

router.post('/addAddress', dAController.addAddress);
router.post('/getAddress', dAController.getAddress);

module.exports = router;