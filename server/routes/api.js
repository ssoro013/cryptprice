const express = require('express');
const router = express.Router();
const controllers = require('../controllers.js');

router.get('/coins', controllers.cache, controllers.getCryptoPrice);

module.exports = router;