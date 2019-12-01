const pool = require('../../db/index')

module.exports = (request, response, next) => {

    pool.query('SELECT * FROM commonposts, contactpost, titles', (err, res) => {
        if (err) return next(err)
        response.json(res.rows)
    })

  }
