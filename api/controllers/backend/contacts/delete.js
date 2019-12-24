const pool = require('../../../db/index')

module.exports = {
  contLog: (req, res, next) => {
    const delLog = {
      text: `DELETE FROM contlogs WHERE id = $1`,
      values: [req.params.logId]
    }
    pool.query(
      delLog,
      (err, result) => {
        if (err) return next(err)
        return res.status(201).send({ msg: 'Session supprimée !' })
      }
    )
  }
}