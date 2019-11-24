const pool = require('../../../db/index'),
      bcrypt = require('bcryptjs'),
      uuid = require('uuid')

module.exports = (req, res, next) => {

  const getUser = {
    text:`SELECT * FROM users WHERE LOWER(username) = LOWER($1);`,
    values:[req.body.userName]
  }

  pool.query(
    getUser,
    (err, result) => {
      if (result.rows.length) {
        return res.status(409).send({
          msg: 'This username is already in use!'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.pass, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database

            const addUser = {
              text:`INSERT INTO users (id, username, pass, registered) VALUES ($1, $2, $3, $4)`,
              values:[uuid.v4(), req.body.userName, hash, new Date()]
            }

            pool.query(
              addUser,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'Registered!'
                });
              }
            );
          }
        });
      }
    }
  );
}