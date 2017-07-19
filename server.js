const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
//use the 8080 server or if the environment to which we are deploying to has
//a specific server, use that instead.
const User = require('./app/models/user.js');

//--------------------DATABASE STUFF--------------------
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myUsers', (err) => {
                                  //name of the dabatase used
  if (err) {
    console.log('Not connected to the database ' + err);
  } else {
    console.log('Connected to mongodb');
  }
});
//---------------------MIDDLEWARES---------------------

app.use(morgan('dev'));
app.use(bodyParser.json());
// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencoded

//-----------------------ROUTES------------------------

//http://localhost:8080/users
app.post('/users', (req, res, next) => {
  const user = new User();

  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save((err) => {
    if (err) {
      res.send('Failed to save user: ' + err);
      return;
    }
    res.send('User created.');
  });
});

//-----------------------------------------------------

app.listen(port, () => {
  console.log('Running the server on port ' + port);
});
