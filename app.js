require('dotenv').config();
require('app-module-path').addPath(__dirname);

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
//const mongo = require('./services/database');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('services/swagger_output.json');

// Routers
const indexRouter = require('./routes/index');
const apiRouter = require('routes/api/v1/index');

// Database initialization with Mongo native driver
// async function startDB() {
//   await mongo.init();
// }
// startDB();

// Connect to Mongo via mongoose
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true
})
.then( () => { console.log('MongoDB connected via mongoose!') } )
.catch( (error) => { console.error(error) } )

// App initialization
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/', indexRouter);
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
