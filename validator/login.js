const validator = require('validator');
const isEmpty = require('is-empty');

const loginValidator = function(data) {
    var errors = {};
    // converts empty fields into an empty string
    data.email = !isEmpty(data.email)? data.email : '';
    data.password = !isEmpty(data.password)? data.password : '';

    // email validator
    if(validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    } else if(!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    // password validator
    if(validator.isEmpty(data.password)){
        errors.password = 'Password is required';
    }

    return {errors, isValid: isEmpty(errors)};
};

module.exports = loginValidator;