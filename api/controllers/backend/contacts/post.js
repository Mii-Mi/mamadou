const pool = require('../../../db/index'),
      path = require('path')

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
  },
  addLogImg: (req, res, next) => {
    const { image } = req.files;
    const uploadFile = path.resolve(__dirname, '../../../public/images/', image.name);
    const axiosUrl = require('../../../../src/config/axios_config')

    image.mv(uploadFile, (err) => {
      if (err) return next(err)
      return res.json({url: `${axiosUrl.baseUrl}/${image.name}`})
    })
  },
  addLog: (req,res, next) => {
    const postLog = {
      text: `INSERT INTO contlogs(contactid, comment)
              VALUES ($1, $2)`,
      values: [req.params.contactid, req.body.content]
    }
    pool.query(
      postLog,
      (err, newLog) => {
        if (err) return next(err)
        return res.status(201).send({msg: 'Suivi ajouté !'})
      }
    )
  }
}