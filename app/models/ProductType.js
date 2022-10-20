const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductTypeSchema = new Schema({
    ptID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
})