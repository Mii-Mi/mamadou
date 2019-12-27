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
    const uuid = require('uuid')
    const { image } = req.files;
    const ext = path.extname(image.name).toLowerCase()
    const renamed = uuid.v4() + ext
    const uploadFile = path.resolve(__dirname, '../../../public/images/', renamed);
    const axiosUrl = require('../../../../src/config/axios_config')

    image.mv(uploadFile, (err) => {
      if (err) return next(err)
      return res.json({url: `${axiosUrl.baseUrl}/admin/image/${renamed}`})
    })
  },
  delLogImg: (req, res, next) => {
    const fs = require('fs'),
          imageToDelete = `public/images/${req.params.image}`

    fs.unlink(imageToDelete, function (err, result) {
      if (err) return next(err)
    });
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