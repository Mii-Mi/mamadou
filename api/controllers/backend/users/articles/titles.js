const pool = require('../../../../db/index')

module.exports = (req, res, next) => {
  const position = req.params.position

  const getTitle = {
    text: `SELECT * FROM titles WHERE position = $1`,
    values: [position]
  }

  pool.query(
    getTitle,
    (err, resp) => {
    if (err) return next(err)
    res.json(resp.rows)
  })

}