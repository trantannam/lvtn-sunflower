const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    commentID: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customers'
    }
});

module.exports = mongoose.model('comment', CommentSchema);