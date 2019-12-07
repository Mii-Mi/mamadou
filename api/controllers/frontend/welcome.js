const pool = require('../../db/index')

module.exports = (req, res, next) => {

  pool.query('SELECT * FROM titles ORDER BY position ASC', (err, titles) => {
    if (err) return next(err)
    res.json(titles.rows)
  })

}
