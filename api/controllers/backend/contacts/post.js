const pool = require('../../../db/index'),
      path = require('path')

module.exports = {
  addProfile: (req, res, next) => {
    if(!req.body.telephone) req.body.telephone = 'Non communiqué'
    if(!req.body.adress) req.body.adress = 'Non communiqué'
    if(!req.body.age) req.body.age = 0
    const newProfile = {
      text: `INSERT INTO contacts(firstname, lastname, email, telephone, adress, age)
              VALUES ($1, $2, $3, $4, $5, $6)
              RETURNING *`,
      values: [req.body.firstName, req.body.lastName, req.body.email, req.body.telephone, req.body.adress, req.body.age]
    }

    pool.query(
      newProfile,
      (err, result) => {
        if (err) return next (err)
        // console.log(result.rows[0]);
        return res.status(201).send({msg: 'Contact ajouté !', newContact: result.rows[0]})
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

    // verify if image is in db, then delete
    const getImg = {
      text: `SELECT * FROM images WHERE imagename = $1`,
      values: [req.params.image]
    }
    pool.query(
      getImg,
      (err, img) => {
        if (err) return next(err)
        if (img) {
          pool.query(
            `DELETE FROM images WHERE imagename = $1`,
            [img.rows[0].imagename],
            (err, del) => {
              if (err) return next(err)
            }
          )
        }
      }
    )
    fs.unlink(imageToDelete, function (err, result) {
      if (err) return next(err)
    });
  },
  addLog: (req,res, next) => {
    const postLog = {
      text: `INSERT INTO contlogs(contactid, comment)
              VALUES ($1, $2)
              RETURNING *, to_char(created, 'dd/mm/yyyy - HH24hMI') date`,
      values: [req.params.contactid, req.body.content]
    }
    pool.query(
      postLog,
      (err, newLog) => {
        if (err) return next(err)

        // Save images in db from body string
        const img = /(?<=<img\ssrc=".+?\/admin\/image\/).+?\..+?(?=">+?)/g
        const str = newLog.rows[0].comment
        let imgs = str.match(img)

        if(imgs) {
          imgs.forEach(image => {
            const saveImgs = {
              text: `INSERT INTO images(imagename, contactid, logid)
                      VALUES ($1, $2, $3)`,
              values: [image, newLog.rows[0].contactid, newLog.rows[0].id]
            }
            pool.query(
              saveImgs,
              (err, saved) => {
                if (err) return next(err)
              }
            )
          });
        }
        return res.status(201).send({msg: 'Suivi ajouté !', added: newLog.rows[0]})
      }
    )
  }
}
