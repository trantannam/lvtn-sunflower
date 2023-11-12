const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../app/controllers/PurchaseOrderController');

router.post("/create", purchaseOrderController.createPO);
router.post("/update-payment-status", purchaseOrderController.updatePaymentStatusPO);
router.get("/:id",purchaseOrderController.getPObyCustomerId);
router.get("/trancode/:id",purchaseOrderController.getPObyId);
router.get("/",purchaseOrderController.getAllPO);

module.exports = router;