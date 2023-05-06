const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes');
const db = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

db.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());

route(app);

// app.use('/img', express.static('public'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

