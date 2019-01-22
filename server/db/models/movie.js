const Sequelize = require('sequelize');
const db = require('../db');

const Movie = db.define('movie', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  thumbnailUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/movie.svg'
  },
  mediaUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Movie;
