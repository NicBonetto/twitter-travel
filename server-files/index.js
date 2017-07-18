require('dotenv').config({ path: './../.env' })
const express = require('express')
const app = express()
const twit = require('twit')
const sentiment = require('sentiment')
const knexFunc = require('./knex.js')
const twitter = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

app.use(express.static(__dirname + './../public'))

app.get('/tweets/:location', (req, res) => {
  knexFunc.incrementCount(req.params.location)
    .then(() => {
      twitter.get('search/tweets', { q: req.params.location, result_type: 'recent', lang: 'en', count: 50 }, (err, data, response) => {
        if (err) console.log(err)
        data.statuses.forEach((element, index) => {
          const twitterSentiment = sentiment(element.text)

          if (twitterSentiment.score > 0) {
            element.userSentiment = 'positive'
          }
          else if (twitterSentiment.score < 0) {
            element.userSentiment = 'negative'
          }
          else {
            element.userSentiment = 'neutral'
          }
        })
        res.json(data)
      })
    })
})

app.get('/database', (req, res) => {
  knexFunc.retrieveTable()
    .then(response => res.json(response))
})

app.listen(process.env.PORTAL)
