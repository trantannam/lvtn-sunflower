const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:lvtnpw1234@sunflower.ztylqfv.mongodb.net/test?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = { connect };