module.exports = function (app) {
  var userRouter = require('../controllers/userController')();
  app.use('/users', userRouter);

};