const express = require('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

const db = require('./db');
const userRouter = require('./routes/user-router');

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(jwt());
app.use('/users', userRouter);
app.use(errorHandler);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));