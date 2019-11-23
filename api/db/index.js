const { Pool } = require('pg'),
      dbConfig = require('../config/db_config')

const pool = new Pool(dbConfig)


module.exports = pool