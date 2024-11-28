const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    nameUrl: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model('url', urlSchema);