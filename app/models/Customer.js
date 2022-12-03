const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    customername: {
        type: String,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    loginname: {
        type: String,
    },
    
}, {timestamps: true});

module.exports = mongoose.model('customers', CustomerSchema);