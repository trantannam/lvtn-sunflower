const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes')
const db = require('./config/db')


const app = express();

db.connect();

route(app);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

