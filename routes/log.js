// routes
const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    res.send(`<h1>The site is active!! </h1>`);
})

module.exports = router;