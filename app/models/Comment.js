const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customers'
    }
},{timestamps: true}
);

module.exports = mongoose.model('comment', CommentSchema);