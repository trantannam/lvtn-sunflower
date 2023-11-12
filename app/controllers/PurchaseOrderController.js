const PurchaseOrder = require('../models/PurchaseOrder');

const PurchaseOrderController = {

    //get all PO
    getAllPO: async (req, res)=>{
        try {
            const PO = await PurchaseOrder.find().populate("customer");
            res.status(200).json({ success: true, message: "successfully", PO })
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //create purchase order
    createPO: async (req, res) => {
        try {
            const PO = new PurchaseOrder(req.body);
            await PO.save();
            res.status(200).json({ success: true, message: "successfully", PO })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //update PaymentStatus by tranCode
    updatePaymentStatusPO: async (req, res) => {
        try {
            const { tranCode, paymentStatus } = req.body;
            const PO = await PurchaseOrder.findOne({ tranCode: tranCode });
            PO.paymentStatus = paymentStatus;
            const update = await PO.save();
            if (!update) {
                return res.status(404).send({ error: 'Error update order', success: false })
            }
            res.status(200).json({ success: true, message: "successfully", PO: update })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //can use id or tranCode
    updateDeliveryStatusPO: async (req, res) => {
        try {
            const { tranCode, deliveryStatus } = req.body;
            const PO = await PurchaseOrder.findOne({ tranCode: tranCode });
            PO.deliveryStatus = deliveryStatus;
            const update = await PO.save();
            if (!update) {
                return res.status(404).send({ error: 'Error update order', success: false })
            }
            res.status(200).json({ success: true, message: "successfully", PO: update })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //find PO customer ID
    getPObyCustomerId: async (req, res) => {
        try {
            PurchaseOrder.find({customer: req.params.id})
            .then(result=>{
                return res.status(200).json({ success: true, message: "successfully", PO: result })
            })

        } catch (error) {
            res.status(500).json(error);
        }
    },

    //find PO by trancode
    getPObyId: async (req, res) => {
        try {
            PurchaseOrder.find({tranCode: req.params.id})
            .then(result=>{
                return res.status(200).json({ success: true, message: "successfully", PO: result })
            })

        } catch (error) {
            res.status(500).json(error); 
        }
    },

    deletePO: async (req, res) => {
        try {
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = PurchaseOrderController;