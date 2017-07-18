require('dotenv').config({ path: './../.env' })

const knex = require('knex')({
  dialect: 'pg',
  connection: process.env.DATABASE_URL
})

module.exports = {
  incrementCount: (location) => {
    const query = knex
      .table('twittertravel')
      .where('location_name', '=', location)
      .update({
        search_count: knex.raw('search_count + 1')
      })

     return query
  },

  retrieveTable: () => {
    const query = knex
      .select('location_name', 'image', 'search_count').from('twittertravel')

    return query
  }
}
