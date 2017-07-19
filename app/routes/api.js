const User = require('../models/user.js');

module.exports = (router) => {
  //http://localhost:8080/api/users
  router.post('/users', (req, res, next) => {
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
  return router;
};
