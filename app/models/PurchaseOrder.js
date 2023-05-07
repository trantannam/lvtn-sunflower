const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PurchaseOrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customers'
    },
    address: {type: String},
    receiver: {
        name: {type: String},
        gender: {type: String},
        phone:{type: String},
        ortherphone: {type: String}
    },
    products: {type: Array},
    paymentstatus: ["unpay", "paid"]
}, { timestamps: true });

module.exports = mongoose.model('purchaseorder', PurchaseOrderSchema);