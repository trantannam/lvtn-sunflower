const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../app/controllers/PurchaseOrderController');

router.post("/create", purchaseOrderController.createPO);

module.exports = router;