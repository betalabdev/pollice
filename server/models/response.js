const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    userId: String,
    questionId: String,
    text:  String,
});

module.exports = mongoose.model('Response', responseSchema);