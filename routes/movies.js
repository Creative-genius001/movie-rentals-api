const express = require('express');
const router = express.Router();
const joi = require('joi');
const { Movie, validate } = require('../models/movie');
const mongoose = require('mongoose');
const { Genre } = require('../models/genre');

// add movie to the database
router.post('/', async (req,res)=>{
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('invalid genre ID');

  let movie = new Movie( {
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalState: req.body.dailyRentalState
  });
  // if(!title && !genre){
  //   res.status(400).send('You must put in a title and genre');
  // }
  movie = await movie.save()
  res.send(movie);
  // res.json({result: movies.filter((movie) => {return movie.genre == "action"})})
})
// async function createMovie(title, genre){
//   let movie = new Movie( {
//     title,
//     genre
//   });

//   movie = await movie.save()
//   console.log(movie);
// }

// createMovie('SpiderMan', 'Thriller');

// display movie from the database
router.get('/:id', async (req,res)=>{
  const movies = await Movie.findById(req.params.id).sort('name');

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  res.send(movies);
})

// update movies in the datbase
router.put('/:id', async (req,res)=>{
  const movie = await Movie.findByIdAndUpdate( req.params.id, 
    {$set: {title: req.body.title, genre: req.body.genre }}, 
    {new:true});
  res.send(movie);
})

// delete movie from the database
router.delete('/:id', async (req,res)=>{
  const movie = await Movie.findByIdAndDelete( req.params.id);
  res.send(movie);
})

module.exports = router;
