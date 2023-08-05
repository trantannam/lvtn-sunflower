const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    customer_name: {
        type: String,
    },
    phone_number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    login_name: {
        type: String,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    list_loveproducts: {
        type: Array,
        default: [],
    }
}, { timestamps: true });

module.exports = mongoose.model('customers', CustomerSchema);