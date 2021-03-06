const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    pin: {
        type: Number,
        required: true
    },
    rounds: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    questions: {
        type: Array,
        required: true
    },
    closed: {
        type: Boolean
    },
    players: {
        type: Array,
    }
});

module.exports = mongoose.model('Game', gameSchema);