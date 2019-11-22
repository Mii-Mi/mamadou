const pool = require('../../db/index')

module.exports = (request, response, next) => {

    pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, res) => {
        if (err) return next(err)
        response.json(res.rows)
    })

  }
