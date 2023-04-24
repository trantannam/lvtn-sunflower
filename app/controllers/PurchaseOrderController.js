const PurchaseOrder = require('../models/PurchaseOrder');

const PurchaseOrderController = {

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
    deletePO: async (req, res)=>{
        try {
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = new PurchaseOrderController();