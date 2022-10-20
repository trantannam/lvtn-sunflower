const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const WarehouseReceiptSchema = new Schema({
    wrID: {
        type: String,
        required: true,
        unique: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    }
})