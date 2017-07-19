const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 8080;
//use the 8080 server or if the environment to which we are deploying to has
//a specific server, use that instead.

//--------------------DATABASE STUFF--------------------
const mongoose = require('mongoose'),
  db = mongoose.createConnection('localhost', 'user-management');
                                        //name of the database used

//checking if we are connected to mongodb
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongodb');
});
//-----------------------------------------------------

//---------------------MIDDLEWARES---------------------

app.use(morgan('dev'));

//-----------------------------------------------------


app.get('/home', (req, res, next) => {
  res.send('hello, from home.');
});


app.listen(port, () => {
  console.log('Running the server on port ' + port);
});
