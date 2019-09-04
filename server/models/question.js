const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    text: String,
    isRight: Boolean,
});

const questionSchema = new Schema({
    presenterId: String,
    text:  String,
    multiple: Boolean,
    openEnded: Boolean,
    answers: [answerSchema],
});

module.exports = mongoose.model('Question', questionSchema);