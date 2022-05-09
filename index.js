const express = require('express');
const app = express();
const log = require('./routes/log');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json())


app.use('/api/app/log', log);
app.use('/api/app/movie', movies);
app.use('/api/app/customer', customers);
app.use('/api/app/genre', genres);
app.use('/api/app/rental', rentals);
app.use('/api/app/user', users);
app.use('/api/app/auth', auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`This port is active on port ${PORT}`));