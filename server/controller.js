const request = require('request');
const redis = require('redis');
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
    request('https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-12-31', (err, response, body) => {
        if(err) {
            res.send(err)
        } else {
            client.setex(req.query.id, 36000, body)
            res.send(body)
        }
    })

}


module.exports = {
    getCryptoPrice,
    cache
}