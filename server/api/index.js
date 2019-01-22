const router = require('express').Router();
const movieRouter = require('./movie');

const {ResponseMessage} = require('../utils');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const error = new Error('Unauthorized');
    error.name = 'Error 401';

    res.status(400).send(new ResponseMessage(null, error));
  }
};

router.use('/movies', isAuthenticated, movieRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.name = 'Error 404';
  error.status = 404;
  next(error);
});

module.exports = router;
