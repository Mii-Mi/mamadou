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
      text: `UPDATE contlogs SET comment = $1 WHERE id = $2 RETURNING *`,
      values: [req.body.content, req.params.logId]
    }
    pool.query(
      putLog,
      (err, newCom) => {
        if (err) return next(err)

        // Save images in db from body string
        const img = /(?<=<img\ssrc=".+?\/admin\/image\/).+?\..+?(?=">+?)/g
        const str = newCom.rows[0].comment
        let imgs = str.match(img)

        if(imgs) {
          imgs.forEach(image => {
            const saveImgs = {
              text: `INSERT INTO images(imagename, contactid, logid)
                      VALUES ($1, $2, $3)`,
              values: [image, newCom.rows[0].contactid, newCom.rows[0].id]
            }
            pool.query(
              saveImgs,
              (err, saved) => {
                if (err) return next(err)
              }
            )
          });
        }
        return res.status(201).send({ msg: 'Session Modifiée !' })
      }
    )
  }
}