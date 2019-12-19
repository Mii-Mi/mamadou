const pool = require('../../../db/index')

module.exports = {
  addProfile: (req, res, next) => {
    const newProfile = {
      text: `INSERT INTO contacts(firstname, lastname, email, telephone, adress, age) 
              VALUES ($1, $2, $3, $4, $5, $6)`,
      values: [req.body.firstName, req.body.lastName, req.body.email, req.body.telephone, req.body.adress, req.body.age]
    }

    pool.query(
      newProfile,
      (err, result) => {
        if (err) return next (err)
        return res.status(201).send({msg: 'Contact ajouté !'})
      }
    )
  }
}