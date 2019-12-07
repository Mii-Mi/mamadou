const pool = require('../../../db/index')

module.exports = (req, res, next) => {

  const id = req.params.id,
        keys = ['icon', 'title', 'big', 'small', 'topo', 'phone', 'adress', 'email', 'content'],
        fields = [],
        table = req.body.type

  keys.forEach(key => {
    if (req.body[key]) fields.push(key)
  })

  fields.forEach((field, index) => {

    pool.query(
      `UPDATE ${table} SET ${field} = ($1) WHERE id = $2`,
      [req.body[field], id],
      (err, resp) => {
        if (err) return next(err)

        if (index === fields.length - 1) return res.status(201).send({ msg: 'Modifié !' });
      }
    )
  })
}