const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    customername: {
        type: String,
        required: true,
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
        required: true,
        unique: true,
    },
    
}, {timestamps: true});

module.exports = mongoose.model('customers', CustomerSchema);