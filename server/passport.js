const passport = require('passport')
const Strategy = require('passport-jwt').Strategy;
const extract = require('passport-jwt').ExtractJwt;
const User = require('../database/db.js')
const keys = require('./config.js');

var options = {};
options.jwtFromRequest = extract.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secret;

const newPassport = passport.use(
    new Strategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );


module.exports = passport;