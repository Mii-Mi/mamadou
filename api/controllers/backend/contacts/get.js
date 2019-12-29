const pool = require('../../../db/index')
      path = require('path')

module.exports = {
  list: (req, res, next) => {
    const getList = {
      text: `SELECT * FROM contacts ORDER BY firstname`
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
      text: `SELECT *, to_char(created, 'dd/mm/yyyy - HH24hMI') date FROM contlogs WHERE contactid = $1 ORDER BY created DESC`,
      values: [req.params.contactId]
    }
    pool.query(
      getlogs,
      (err, logs) => {
        if (err) next (err)
        res.json(logs.rows)
      }
    )
  },
  tmpImgLog: (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../../../public/images', req.params.img))
  }
}