const pool = require('../../../db/index')

module.exports = {
  list: (req, res, next) => {
    const getList = {
      text: `SELECT * FROM contacts`
    }
    pool.query(
      getList,
      (err, list) => {
        if (err) next(err)
        res.json(list.rows)
      }
    )
  },
  logs: (req, res, next) => {
    const getlogs = {
      text: `SELECT *, to_char(created, 'dd/mm/yyyy - HH24h MI') created FROM contlogs WHERE contactid = $1`,
      values: [req.params.contactId]
    }
    pool.query(
      getlogs,
      (err, logs) => {
        if (err) next (err)
        res.json(logs.rows)
      }
    )
  }
}