const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WardSchema = new Schema({
    wardId: {
        type: String,
        required: true,
        unique: true
    },
    wardname: {
        type: String,
        required: true
    },
    wardtype: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ward', WardSchema);