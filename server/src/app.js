const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');

const v1 = require('./routes/v1');

// DB Config
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to the DB');
});

mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to the DB: ' + err);
});

//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api/v1', v1);

//Errors
app.use((req, res, next) => { //404 Not found
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const error = err.message || 'Error processing your request';

    res.status(status).send({
        error
    });
});

module.exports = app;