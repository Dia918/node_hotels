const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;
//const mongoURL = process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to mongodb server');
});

db.on('disconnected', () => {
    console.log('Mongodb Disconnected');
});

db.on('error', (err) => {
    console.log('Error', err);
});

module.exports = db;