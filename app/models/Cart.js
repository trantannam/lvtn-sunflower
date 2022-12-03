const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    customerID: {
        type: Schema.Types.ObjectId,
        required: false
    },
    product: [{
        productID: {type: Schema.Types.ObjectId, ref: "products"},
        quantity: Number
    }] 
}, {timestamps: true}
);

module.exports = mongoose.model('cart', CartSchema);