var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var cors = require('cors');
var db = require('../database/db')

var routes = require('./routes/index')
var users = require('./routes/users')
var controllers = require('./controllers.js')

var app = express();

var port = process.env.port || 5000;

//Express middleware
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Set static folder
app.use(express.static('public'))

//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

//Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

app.get('/coins', controllers.cache, controllers.getCryptoPrice)

app.listen(port, () => console.log(`App is listening on port ${port}!`))