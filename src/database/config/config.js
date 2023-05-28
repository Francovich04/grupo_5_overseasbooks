
module.exports = {
  "development": {
    "username": process.env.DBUSER,
    "password": process.env.DBPASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.DBHOST,
    "dialect": process.env.DIALECT
  },
  // pruebaaaa

  "test": {
    "username": process.env.DBUSER,
    "password": process.env.DBPASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.DBHOST,
    "dialect": process.env.DIALECT
  }
  // "production": {
  //   "username": "root",
  //   "password": "root",
  //   "database": "mydb",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }
}
