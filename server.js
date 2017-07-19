const express = require('express');
const app = express();

app.listen(process.env.PORT || 8080, () => {
  //use the 8080 server or if the environment to which we are deploying to has
  //a specific server, use that instead.
  console.log('Running the server');
});
