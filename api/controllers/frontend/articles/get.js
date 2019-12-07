const pool = require('../../../db/index')

module.exports = {

  single: (req, res, next) => {
    const position = req.params.position
    const getSingle = {
      text: `SELECT * FROM commonposts WHERE position = $1`,
      values: [position]
    }
    pool.query(
      getSingle,
      (err, article) => {
        if(err) return next(err)
        res.json(article.rows)
      }
    )
  },
  contact: (req, res, next) => {
    const getContact = {
      text: `SELECT * FROM contactpost`
    }
    pool.query(
      getContact,
      (err, article) => {
        if(err) return next(err)
        res.json(article.rows)
      }
    )
  }
}