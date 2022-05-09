const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');
// const genreSchema = new mongoose.Schema({
//     name: String
//   });
  
  const movieSchema = new mongoose.Schema({
    title: String,
    genre: genreSchema,
    numberInStock: Number,
    dailyRentalRate: String
  });
  
//   const Genre = mongoose.model('Genre', genreSchema);
  const Movie = mongoose.model('Movie', movieSchema);

  function validateMovie(movie) {
    const schema = Joi.object({
      title: Joi.string().required(),
      genreId: Joi.string().required(),
      numberInStock: Joi.number().required(),
      dailyRentalRate: Joi.number().required()
    });
  
    return schema.validate(movie);
  }
  
  exports.movieSchema = movieSchema; 
  exports.validate = validateMovie;
  exports.Movie = Movie;