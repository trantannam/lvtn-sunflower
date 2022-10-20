const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

    productname: {
        type: String,
        required: true
    },
    price: { 
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    description:{
        type: String,
    }
    
})

module.exports = mongoose.model('products', ProductSchema)