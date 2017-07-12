const express = require('express')
const app = express()
const twit = require('twit')
const credentials = require('./creds')
const twitter = new twit(credentials)

app.use(express.static(__dirname + './../public'))

app.get('/tweets/:location', (req, res) => {
  twitter.get('search/tweets', { q: req.params.location, result_type: 'recent', lang: 'en', count: 50 }, (err, data, response) => {
    if (err) console.log(err)
    res.json(data)
  })
})

app.listen(3000)
