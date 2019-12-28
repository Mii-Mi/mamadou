const pool = require('../../../db/index'),
      fs = require('fs')

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

        //Delete images
        const getImgs = {
          text: `SELECT imagename FROM images WHERE logid = $1`,
          values: [req.params.logId]
        }
        pool.query(
          getImgs,
          (err, images) => {
            if (err) return next(err)
            if (images.rows) {
              images.rows.forEach(image => {
                fs.unlink(`public/images/${image.imagename}`, function (err, result) {
                  if (err) return next(err)
                })
              });
              pool.query(
                `DELETE FROM images WHERE logid = $1`,
                [req.params.logId],
                (err, result) => {
                  if (err) return next(err)
                }
              )
            }
            return res.status(201).send({ msg: 'Session supprimée !' })
          }
        )
      }
    )
  },
  contact: (req, res, next) => {
    const delCont = {
      text: `DELETE from contacts WHERE id = $1`,
      values: [req.params.contactId]
    }
    pool.query(
      delCont,
      (err, result) => {
        if (err) return next(err)
        //Delete contact logs
        pool.query(
          `DELETE from contlogs WHERE contactid = $1`,
          [req.params.contactId],
          (err, del) => {
            if (err) return next(err)

            //Delete images
            const getImgs = {
              text: `SELECT imagename FROM images WHERE contactid = $1`,
              values: [req.params.contactId]
            }
            pool.query(
              getImgs,
              (err, images) => {
                if (err) return next(err)
                if (images.rows) {
                  images.rows.forEach(image => {
                    fs.unlink(`public/images/${image.imagename}`, function (err, result) {
                      if (err) return next(err)
                    })
                  });
                  pool.query(
                    `DELETE FROM images WHERE contactid = $1`,
                    [req.params.contactId],
                    (err, result) => {
                      if (err) return next(err)
                    }
                  )
                }
                return res.status(201).send({ msg: 'Contact supprimé !' })
              }
            )
          }
        )
      }
    )
  }
}