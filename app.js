var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const mariadb = require('mariadb');
const { log } = require('./lib');
const { v4: uuidv4 } = require('uuid');

// for use factory
require('express-di');

var app = express();

var indexRouter = require('./routes/index');
var serviceRouter = require('./routes/serviceRouter');
var carRouter = require('./routes/carRouter');
var ownerRouter = require('./routes/ownerRouter');
var maintenanceRouter = require('./routes/maintenanceRouter');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//set mode
let mode = '';
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV = 'development';
  mode = 'development';
}

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

//levanto el archivo .env
const basePath = path.join(__dirname, `.env`);
const devPath = path.join(__dirname, `.env${mode ? `.${mode}` : ``}`);
const env = dotenv.config({ path: devPath });
const envDev = dotenv.config({ path: basePath });


app.use('/', indexRouter);
app.use('/service', serviceRouter);
app.use('/car', carRouter);
app.use('/owner', ownerRouter);
app.use('/maintenance', maintenanceRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  log.error(`[Handle] 404`);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  log.error(`[Handle] ${err.message}`);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//MariaDB Connection
const pool  = mariadb.createPool({
  connectionLimit : process.env.APP_DB_CONNECTIONLIMIT,
  host            : process.env.APP_DB_HOST,
  port            : process.env.APP_DB_PORT,
  user            : process.env.APP_DB_USER,
  password        : process.env.APP_DB_PASSWORD,
  database        : process.env.APP_DB_DATABASE,
  multipleStatements: process.env.APP_DB_MULTIPLESTATEMENTS
});


//acquire This event emits a connection is acquired from pool.
//connection  This event is emitted when a new connection is added to the pool. Has a connection object parameter
//enqueue This event is emitted when a command cannot be satisfied immediately by the pool and is queued.
//release This event is emitted when a connection is released back into the pool. Has a connection object parameter
pool.on('acquire', function (connection) {
  log.info(`[MariaDB][acquire] ${connection.lastUse}`);
});

pool.on('connection', function (connection) {
  log.info(`[MariaDB][connection] ${connection.lastUse}`);
  // connection.query('SET GLOBAL event_scheduler = 1;');
});

pool.on('enqueue', function (connection) {
  log.info(`[MariaDB][enqueue] ${connection.lastUse}`);
});

pool.on('release', function (connection) {
  log.info(`[MariaDB][release] ${connection.lastUse}`);
});

app.factory('db', (req, res, next) => {
  next(null, pool);
});

// To add a random UUID
app.factory('reqUUID', (req, res, next) => {
  next(null, uuidv4());
});

log.info(`[Info] ${process.env.APP_ID_SISTEMA}`);

module.exports = app;
