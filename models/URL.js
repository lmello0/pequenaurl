const mongoose = require('../database/database');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    originalUrl: String,
    shortUrl: String
});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;