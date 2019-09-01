var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var indexRouter = require('./routes/index');
var pollsRouter = require('./routes/polls');
var votesRouter = require('./routes/votes');
var resultsRouter = require('./routes/results');

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/polls', pollsRouter);
app.use('/votes', votesRouter);
app.use('/results', resultsRouter);

module.exports = app;