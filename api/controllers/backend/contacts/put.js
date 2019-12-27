const pool = require('../../../db/index')

module.exports = {
  profile: (req, res, next) => {
    const putProfile = {
      text: `UPDATE contacts 
              SET firstname = $1, lastname = $2, age = $3, adress = $4, email = $5, telephone = $6
              WHERE id = $7`,
      values: [req.body.firstName, req.body.lastName, req.body.age, req.body.adress, req.body.email, req.body.telephone, req.params.contactId]
    }
    pool.query(
      putProfile,
      (err, newProfile) => {
        if (err) return next(err)
        return res.status(201).send({msg: 'Profil modifié !'})
      }
    )
  },
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