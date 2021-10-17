const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const googleSetup = require('./passport/google');

app.use(express.json());
// app.use(express.urlencoded({extend:true}));
app.use(cors());
app.use(cookieParser());

app.use(passport.initialize());

const indexRouter = require('./routes/index');
app.use('/api', indexRouter);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on ${process.env.PORT || 3001}`)
})

module.exports = app;