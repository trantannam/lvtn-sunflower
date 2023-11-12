const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PurchaseOrderSchema = new Schema({
    tranCode: {type: String},
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customers'
    },
    receiveAddress: {type: String},
    receiver: {
        name: {type: String},
        gender: {type: String},
        phone:{type: String},
        ortherphone: {type: String}
    },
    products: {type: Array},
    totalEstimate: {type: Schema.Types.Number, default:0},
    paymentStatus: {type: String}, //["cod", "paid", "Waiting to pay"]
    deliveryStatus: {type: String}//["waiting for progressing", "shipping", "delivered"]

}, { timestamps: true });

module.exports = mongoose.model('purchaseorder', PurchaseOrderSchema);