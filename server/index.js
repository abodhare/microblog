const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

const db = require('./db');
const userRouter = require('./routes/user-router');
const postRouter = require('./routes/posts-router');

const app = express();
const apiPort = 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(busboyBodyParser());
// app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(jwt());
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use(errorHandler);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));