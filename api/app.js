require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoDB = require('./config/db');

// Require Routes
const usersRouter = require('./routes/userRoutes');
const projectsRouter = require('./routes/projectRoutes');
const issuesRouter = require('./routes/issueRoutes');

const app = express();

//DB
mongoDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome to bug tracker api',
  });
});
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/issues', issuesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  return res.status(404).json({
    message: 'Not Found',
  });
});

// error handler
app.use(function (err, req, res, next) {
  return res.status(500).json({
    message: 'error in internal server you can try again',
  });
});

module.exports = app;
