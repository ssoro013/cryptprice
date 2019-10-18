const validator = require('validator');
const isEmpty = require('is-empty');

const registerValidator = function(data) {
    // initiate erros object to keep track of validation errors
    var errors = {}
    
    // converts empty field to an empty string
    data.firstName = !isEmpty(data.firstName)? data.firstName : '';
    data.lastName = !isEmpty(data.lastName)? data.lastName : '';
    data.email = !isEmpty(data.email)? data.email : '';
    data.password = !isEmpty(data.password)? data.password : '';
    data.password2 = !isEmpty(data.password2)? data.password2 : '';

    // names validator
    if(validator.isEmpty(data.firstName)){
        errors.firstName = 'First name is required';
    }

    if(validator.isEmpty(data.lastName)){
        errors.lastName = 'Last name is required';
    }
    
    // email validator
    if(validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    // password validator
    if(validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    if(validator.isEmpty(data.password2)) {
        errors.password = 'Confirm password';
    }
    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'Password must be at least 6 characters';
    }
    if(!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {errors, isValid: isEmpty(errors)};
};

module.exports = registerValidator;