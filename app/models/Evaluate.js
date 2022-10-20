const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EvaluateSchema = new Schema({
    evaluateId: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    scoreevaluate: {
        type: Number,
        required: true
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

module.exports = mongoose.model('evaluate', EvaluateSchema);