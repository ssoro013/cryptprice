const request = require('request');
const redis = require('redis');
const api = require('./config.js')
const redis_port = process.env.port || 6379;
const client = redis.createClient(redis_port)

const cache = (req, res) => {
    client.get(req.query.id, (err, data) => {
        if(err) {
            console.log(err)
        } else if (data) {
            // console.log('fectching data...')
            res.send(data)
        } else {
            getCryptoPrice(req, res);
        }
    })
}

const getCryptoPrice = (req, res) => {
    request(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${req.query.id}&tsym=USD&limit=365&${api.key}`, (err, response, body) => {
        if(err) {
            res.send(err)
        } else {
            // var data = body.data.data
            client.setex(req.query.id, 36000, body)
            res.send(body)
        }
    })

}

module.exports = {
    getCryptoPrice,
    cache
}