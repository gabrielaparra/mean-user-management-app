const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
//use the 8080 server or if the environment to which we are deploying to has
//a specific server, use that instead.
const router = express.Router();
const appRoutes = require('./app/routes/api.js')(router);
//use the router object with this routes file
const path = require('path');

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
//----!!!The order of the middlewares is very important

app.use(morgan('dev'));
//log all requests
app.use(bodyParser.json());
// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));
//serve static content for the app from the “public” directory
//in the application directory
//express serving a static file location

//the data needs to be parsed before we hit the routes
app.use('/api', appRoutes);
//'/api' is added to differentiate between back end and
//front end routes.

//-----------------------ROUTES------------------------

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//-----------------------------------------------------

app.listen(port, () => {
  console.log('Running the server on port ' + port);
});
