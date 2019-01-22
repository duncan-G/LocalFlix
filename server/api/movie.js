const router = require('express').Router();
const { Movie } = require('../db/models');
const { ResponseMessage } = require('../utils');

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.findAll();
    res.send(new ResponseMessage(movies));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
