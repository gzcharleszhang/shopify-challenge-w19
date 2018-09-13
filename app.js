const express = require('express');
const logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to Mongo Database hosted on MLab
mongoose.connect(process.env.MONGO_URL, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
}).then(() => console.log('successfully connected to mongo'))
  .catch(err => console.log(err));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;