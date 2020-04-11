var createError = require('http-errors');
var express = require('express');
const fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var covidRouter = require('./routes/covid');

var app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.txt'), { flags: 'a' }
);

app.use(logger('dev'));
app.use(function (req, res, next) {
  let now = Date.now();
  const { method, path } = req;
  res.on('close', () => {
    now = Date.now() - now;
    const str = `${method}\t\t${path}\t\t${res.statusCode}\t\t${now} ms\n`
    accessLogStream.write(str);
  });
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/on-covid-19', covidRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send({
    'error': 'Oops! Something did not go right.'
  });
});

module.exports = app;
