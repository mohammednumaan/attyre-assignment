// configure the dotenv module which will
// allow us to access environmental variables
require("dotenv").config();

// module imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

const compression = require('compression')

// router imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

// initialize an express app object
const app = express();

// create a connection to the MongoDB database
// via the Mongoose ODM
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main(){
  await mongoose.connect(mongoDB);
}

// view engine setup (this can be ignored for this assignment)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// adds the gzip compression middleware to the middleware chain
// to reduce the size of the 'response' by compressing it
app.use(compression())

// adds the imported router objects to the middleware chain
// to handle matching routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const error = req.app.get('env') === 'development' ? err : {};

  // send the error message
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
