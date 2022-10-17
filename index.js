import express from 'express';
import mongoose from 'mongoose';

const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://admin:lvtnpw1234@cluster0.9kwpm3c.mongodb.net/?retryWrites=true&w=majority',
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

connectDB();

const app = express();

app.get('/', (req, res) => res.send('hello'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));