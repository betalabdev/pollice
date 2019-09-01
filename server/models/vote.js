const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    userId:  String,
    questionId: String,
    answerIds: [String],
});

module.exports = mongoose.model('Vote', voteSchema);