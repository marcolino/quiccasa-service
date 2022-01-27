const auth = require('./auth');
const user = require('./user');
const authenticate = require('../middlewares/authenticate');

module.exports = app => {
  app.use('/api/auth', auth);
  app.use('/api/user', authenticate, user);
  app.use('/api/', authenticate, (req, res, next) => {
    res.status(200).json({ message: "Welcome to the Quiccasa base API"}); // TODO: quiccasa should be a variable
    //next();
  });
};