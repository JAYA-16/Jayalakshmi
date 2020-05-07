const express = require('express');
const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const sequelize = require('sequelize');
const cors = require('cors')
const passport=require('passport')
//setup environment
dotenv.config();

//mongo db connection
// mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(passport.initialize())
require('./authconfig/passport');
app.use('/api/users', users);

//run app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Backend server listening on the port ${PORT}`);
});
