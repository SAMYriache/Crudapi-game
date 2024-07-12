const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    classe: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Character', CharacterSchema);
