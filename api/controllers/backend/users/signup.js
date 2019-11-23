const pool = require('../../../db/index'),
      bcrypt = require('bcryptjs'),
      uuid = require('uuid')

module.exports = (req, res, next) => {
  const {username, pass} = req.body

  const getUser = {
    text:`SELECT * FROM users WHERE LOWER(username) = LOWER($1);`,
    values:[username]
  }

  pool.query(
    getUser,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This username is already in use!'
        });
      } else {
        // username is available
        bcrypt.hash(pass, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database

            const addUser = {
              text:`INSERT INTO users (id, username, pass, registered) VALUES ($1, $2, $3, $4)`,
              values:[uuid.v4(), username, hash, new Date()]
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