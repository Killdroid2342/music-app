const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 16;

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
    .then(([rows]) => {
      if (rows.length > 0) {
        return rows[0];
      } else {
        return false;
      }
    });
  return res;
};

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  conn.query('INSERT INTO users (username, password) VALUES (?,?)', [
    username,
    hashedPassword,
  ]);
};

module.exports = {
  createUser,
  isUserExists,
};