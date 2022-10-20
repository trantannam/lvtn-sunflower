const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProvinceSchema = new Schema({
    provinceId: {
        type: String,
        requied: true,
        unique: true
    },
    provincename: {
        type: String,
        required: true
    },
    provincetype: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("province", ProvinceSchema);