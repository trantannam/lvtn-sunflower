const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
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
    },
    product_type: {
        type: Schema.Types.ObjectId,
        ref: 'product_type',
    }
})

module.exports = mongoose.model('products', ProductSchema)