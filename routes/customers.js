const { Customer } = require('../models/customer');
const express = require('express');
const router = express.Router();
const joi = require('joi'); 
const mongoose = require('mongoose');

    router.post('/', async (req,res)=>{
        const { error } = validate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);

        let customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }); 

        customer = await customer.save();
        res.send(customer);
    });

    router.get('/', async (req,res)=>{
        let customer = await Customer.find().sort('name');
        res.send(customer);
        console.log('data found');
});
    
    


    // "name": "Ovie Igho",
    // "phone": "37933739892",
    // "isGold": "true",

    module.exports = router;
    
    