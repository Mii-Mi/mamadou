const pool = require('../../../db/index')

module.exports = {
  contactLog: (req, res, next) => {
    const putLog = {
      text: `UPDATE contlogs SET comment = $1 WHERE id = $2`,
      values: [req.body.content, req.params.logId]
    }
    pool.query(
      putLog,
      (err, newCom) => {
        if (err) return next(err)
        return res.status(201).send({ msg: 'Session Modifiée !' })
      }
    )
  }
}