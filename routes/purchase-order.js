const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../app/controllers/PurchaseOrderController');

router.post("/create", purchaseOrderController.createPO);
router.post("/update-payment-status", purchaseOrderController.updatePaymentStatusPO);
router.get("/:id",purchaseOrderController.getPObyId);

module.exports = router;