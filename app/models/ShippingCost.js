const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShippingCostSchema = new Schema({
    tfId: {
        type: String,
        required: true,
        unique: true
    },
    cost: {
        type: Number,
        required: true 
    }
});

module.exports = mongoose.model('shippingcost', ShippingCostSchema);