const pool = require('../../../db/index')

module.exports = async(req, res, next) => {

  const id = req.params.id,
        keys = ['icon', 'title', 'big', 'small', 'topo', 'phone', 'adress', 'email', 'content'],
        fields = [],
        table = req.body.type

  await keys.forEach(key => {
    if (req.body[key]) fields.push(key)
  })

  fields.forEach(async(field, index) => {

    await pool.query(
      `UPDATE ${table} SET ${field} = ($1) WHERE id = $2`,
      [req.body[field], id],
      (err, resp) => {
        if (err) return next(err)

        if (index === fields.length - 1) return res.status(201).send({ msg: 'Modifié !' });
      }
    )
  })
}