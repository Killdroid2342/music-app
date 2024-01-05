const bcrypt = require('bcrypt');
const { getDbConn } = require('../util');

require('dotenv').config();

const isUserExists = async (username) => {
  const conn = getDbConn();
  const res = conn
    .promise()
    .query('SELECT * FROM musicplayer_users WHERE username = ?', [username])
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        return rows[0];
      } else {
        return false;
      }
    });
  conn.end();
  return res;
};
const hashPassword = async (password, saltRounds) => {
  const res = bcrypt.hashSync(password, saltRounds);
  return res;
};
const createUser = async (username, password, users_following) => {
  const conn = getDbConn();
  console.log(username, password);
  conn.query(
    'INSERT INTO musicplayer_users (username, password, users_following) VALUES (?, ?, ?)',
    [username, password, users_following || '']
  );

  conn.end();
};

const deleteUser = async (username) => {
  const conn = getDbConn();
  conn.query('DELETE FROM musicplayer_users WHERE username = ?', [username]);
  conn.end();
};

async function comparePassswords(passwords, hash) {
  return bcrypt.compareSync(passwords, hash);
}
const searchUsers = async (username) => {
  const conn = getDbConn();
  const res = conn
    .promise()
    .query(
      'SELECT username FROM musicplayer_users WHERE username LIKE CONCAT("%", ?, "%")',
      [username]
    )
    .then(([rows, fields]) => {
      return rows;
    });
  conn.end();
  return res;
};
const usersFollowing = (username, user_followers) => {
  const conn = getDbConn();
  conn.query(
    'UPDATE musicplayer_users SET users_following = ? WHERE username = ?',
    [user_followers, username]
  );
};
const getFollowingUsers = async (username) => {
  const conn = getDbConn();
  const [rows, fields] = await conn
    .promise()
    .query('SELECT users_following FROM musicplayer_users WHERE username = ?', [
      username,
    ]);
  conn.end();
  return rows;
};
module.exports = {
  createUser,
  isUserExists,
  hashPassword,
  comparePassswords,
  deleteUser,
  searchUsers,
  usersFollowing,
  getFollowingUsers,
};
