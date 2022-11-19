const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BillDetailSchema = new Schema({
    detailamount: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
});

module.exports = mongoose.model("billdetail", BillDetailSchema);