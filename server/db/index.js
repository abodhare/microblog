const mongoose = require('mongoose');
const config = require('../config.json');

mongoose
    .connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;