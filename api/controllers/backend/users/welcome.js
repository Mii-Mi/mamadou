const pool = require('../../../db/index')

module.exports = (req, res, next) => {

    pool.query('SELECT * FROM commonposts, contactpost, titles', (err, resp) => {
        if (err) return next(err)
        res.json(resp.rows)
    })

  }