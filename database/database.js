const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGODB_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true });
mongoose.set('strictQuery', false);

console.log('Connected to ' + MONGO_URL)

module.exports = mongoose