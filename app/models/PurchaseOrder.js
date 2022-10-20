const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PurchaseOrderSchema = new Schema({
    poID: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customers'
    }
})