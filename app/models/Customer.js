const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    customerID: {
        type: String,
        required: true,
        unique: true
    },
    customername: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    passwork: {
        type: String,
        required: true
    },
    loginname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('customers', CustomerSchema);