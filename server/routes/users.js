const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config.js');

// input validators
const registerValidator = require('../../validator/register.js')
const loginValidator = require('../../validator/login.js');

// user model
const User = require('../../database/db.js');

// registration route
router.post('/register', (req, res) => {
    const {errors, isValid} = registerValidator(req.body)

    // registration validation
    if(!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            res.status(400).json({email: 'Email already exists'})
        } else {
            const newUser = new User ({
                firstName : req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

// login route
router.post('/login', (req, res) => {
    const {errors, isValid} = loginValidator(req.body);

    // login validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
    .then(user => {
        if(!user) {
            return res.status(400).json({emailNotFound: 'Email was not found'})
        }

        //password check
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch) {
                const payload = {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`
                }

                jwt.sign(
                    payload,
                    keys.secret,
                    {
                        expiresIn: 31556926 //year in second
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer' + token
                        })
                    }
                )
            }
            else {
                return res.status(400).json({passwordIncorrect: 'Password is incorrect'})
            }
        })
    })
})

module.exports = router;