const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    addressId: {
        type: String,
        required: true,
        unique: true
    },
    contentaddress: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('address', AddressSchema);