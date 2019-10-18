const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./passport.js');
const morgan = require('morgan');
const cors = require('cors');
const User = require('../database/db')
const users = require('./routes/users.js')
const api = require('./routes/api.js')
const controllers = require('./controllers.js')

const app = express();

const port = process.env.port || 5000;

// Express middleware
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Set static folder
app.use(express.static('public'))

// Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Routes
app.use('/users', users)
app.use('/', api)


app.listen(port, () => console.log(`App is listening on port ${port}!`))