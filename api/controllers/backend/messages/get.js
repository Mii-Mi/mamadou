const pool = require('../../../db/index')

module.exports = (req, res, next) => {
  const getMsgs = {
    text: `SELECT * FROM messages ORDER BY created DESC`
  }
  pool.query(
    getMsgs,
    (err, messages) => {
      if (err) next(err)
      res.json(messages.rows)
    }
  )
}