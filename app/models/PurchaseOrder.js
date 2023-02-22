const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PurchaseOrderSchema = new Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    productlist: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customers'
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'address'
    },
    delivery: ["not delivery", "delivering", "delivered"],
    payment: ["unpay", "paid"]
}, { timestamps: true });

module.exports = mongoose.model('purchaseorder', PurchaseOrderSchema);