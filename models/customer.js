const Joi = require('joi');
const mongoose = require('mongoose');


const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        maxlength: 11,
        minlength: 11
    },
    isGold: {
        type: Boolean,
        required: true
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
  
    return schema.validate(customer);
  }

exports.validate = validateCustomer;
exports.Customer = Customer;    