const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    customerID: {
        type: Schema.Types.ObjectId,
        ref: "customers"
    },
    division: [{
        province: {
            name: String,
            code: Number
        },
        district: {
            name: String,
            code: Number
        },
        ward: {
            name: String,
            code: Number
        },
        describe: {
            name: String,
        }
    }],
    contentaddress: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('address', AddressSchema);