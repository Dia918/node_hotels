const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

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