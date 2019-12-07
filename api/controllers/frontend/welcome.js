const pool = require('../../db/index')

module.exports = (req, res, next) => {

  pool.query('SELECT * FROM titles', (err, titles) => {
    if (err) return next(err)
    res.json(titles.rows)
  })

}
