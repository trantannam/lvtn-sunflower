// const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { Schema } = mongoose;
// const { generateToken } = require('../utils.js');
const staffSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String, required: false },
        phone: { type: Number, required: false },
        address: { type: String, required: false },
        status: { type: Number, default: 0 },
        isAdmin: { type: Boolean, default: false, required: false }
    },
    {
        timestamps: true,   // this will add createdAt and updatedAt timestamps
    }
);

// staffSchema.pre('save', function () {
//     this.password = bcrypt.hashSync(this.password, 8)
//     this.token = generateToken(this)
// })

module.exports = mongoose.model('staff', staffSchema);
