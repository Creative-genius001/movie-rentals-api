const express = require('express');
const router = express.Router();
const joi = require('joi');
const { Rental, validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const mongoose = require('mongoose');

router.post('/', async (req,res)=>{
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('invalid customer ID');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('invalid movie ID');

  if(movie.numberInStock === 0) return res.status(400).send('movie not in stock') 

  let rental = new Rental( {
    customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    },
    numberInStock: req.body.numberInStock,
    dailyRentalState: req.body.dailyRentalState
  });
  rental = await rental.save();

  movie.numberInStock--;
  movie.save();
  
  res.send(rental);
})


router.get('/', async (req,res)=>{
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);3
})

// update movies in the datbase
// router.put('/:id', async (req,res)=>{
//   const movie = await Movie.findByIdAndUpdate( req.params.id, 
//     {$set: {title: req.body.title, genre: req.body.genre }}, 
//     {new:true});
//   res.send(movie);
// })

// delete movie from the database
// router.delete('/:id', async (req,res)=>{
//   const movie = await Movie.findByIdAndDelete( req.params.id);
//   res.send(movie);
// })

module.exports = router;
