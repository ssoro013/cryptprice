const express = require('express');

const morgan = require('morgan');

const app = express();

const bodyParser = require('body-parser')

const cors = require('cors')

const port = process.env.port || 5000;

const controllers = require('./controllers.js')

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cors());

app.use(express.static('public'))

app.get('/coins', controllers.cache, controllers.getCryptoPrice)

app.listen(port, () => console.log(`App is listening on port ${port}`))