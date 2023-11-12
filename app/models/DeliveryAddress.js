const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    customerID: {
        type: Schema.Types.ObjectId,
        ref: "customers"
    },
    division: [{
        province: {
            type: String,

        },
        district: {
            type: String,

        },
        ward: {
            type: String,

        },
        describe: {
            type: String,
        },
        type: {
            type: String,
            require: true
        }
    }],

});

module.exports = mongoose.model('address', AddressSchema);