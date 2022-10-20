const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BillSchema = new Schema({
    BillId: {
        type: String,
        required: true,
        unique: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('bill', BillSchema);