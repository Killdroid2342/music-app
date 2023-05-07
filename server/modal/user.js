const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'musicplayer',
});
const isUserExists = async (username) => {
  const res = conn
    .promise()
    .query('SELECT * FROM users WHERE username = ?', [username])
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        return rows[0];
      } else {
        return false;
      }
    });
  return res;
};
const hashPassword = async (password, saltRounds) => {
  const res = bcrypt.hashSync(password, saltRounds);
  return res;
};
const createUser = async (username, password) => {
  conn.query('INSERT INTO users (username, password) VALUES (?,?)', [
    username,
    password,
  ]);
};

// compare passwords

module.exports = {
  createUser,
  isUserExists,
  hashPassword,
};
