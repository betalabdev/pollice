const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presenterSchema = new Schema({
  googleId:  String,
});

module.exports = mongoose.model('Presenter', presenterSchema);