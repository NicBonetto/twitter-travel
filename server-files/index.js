require('dotenv').config({ path: './../.env' })
const express = require('express')
const app = express()
const twit = require('twit')
const twitter = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

app.use(express.static(__dirname + './../public'))

app.get('/tweets/:location', (req, res) => {
  twitter.get('search/tweets', { q: req.params.location, result_type: 'recent', lang: 'en', count: 50 }, (err, data, response) => {
    if (err) console.log(err)
    res.json(data)
  })
})

app.listen(3000)
