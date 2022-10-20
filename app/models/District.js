const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
    districtId: {
        type: String,
        required: true,
        unique: true
    },
    districtname: {
        type: String,
        required: true
    },
    districttype: {
        type: String,
        requiredtrue
    }
});

module.exports = mongoose.model('district', DistrictSchema);
