const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    answers: {
        type: Array,
        required: true
    },
});

module.exports = mongoose.model('Answer', answerSchema);