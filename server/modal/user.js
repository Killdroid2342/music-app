const bcrypt = require('bcrypt');
const { getDbConn } = require('../util');
const { v4: uuidv4 } = require('uuid');

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

const checkIfFollowing = async (source_user, target_user) => {
  try {
    const conn = getDbConn();
    const res = await conn
      .promise()
      .query(
        'SELECT * FROM musicplayer_following WHERE source_account= ? AND target_account=?',
        [source_user, target_user]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return true;
        } else {
          return false;
        }
      });
    conn.end();
    return res;
  } catch (e) {
    return false;
  }
};
const FollowUser = (source_user, target_user) => {
  const conn = getDbConn();
  const uniqueID = uuidv4();
  conn.query(
    'INSERT INTO musicplayer_following (ID,source_account, target_account) VALUES (?, ?,?)',
    [uniqueID, source_user, target_user]
  );
};
const FollowingUsers = async (username) => {
  const conn = getDbConn();
  const [rows, fields] = await conn
    .promise()
    .query('SELECT * FROM musicplayer_following WHERE source_account = ?', [
      username,
    ]);
  console.log(rows);
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
  checkIfFollowing,
  FollowUser,
  FollowingUsers,
};
