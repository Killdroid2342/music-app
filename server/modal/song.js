const { getDbConn } = require('../util');
require('dotenv').config();

const uploadSongs = async (username, date_added, songname, uuid) => {
  const conn = getDbConn();
  conn.query(
    'INSERT INTO musicplayer_songs (username, date_added, songname, UUID) VALUES (?,?,?,?)',
    [username, date_added, songname, uuid]
  );
  conn.end();
};
const getSongs = async (username) => {
  const conn = getDbConn();
  const [rows, fields] = await conn
    .promise()
    .query('SELECT * FROM musicplayer_songs WHERE username = ?', [username]);
  conn.end();
  return rows;
};

const deleteSong = async (uuid) => {
  const conn = getDbConn();
  try {
    await conn
      .promise()
      .query('DELETE FROM musicplayer_songs WHERE UUID = ?', [uuid]);
  } catch (e) {
    console.log(e);
    throw e;
  }
  conn.end();
};

module.exports = {
  uploadSongs,
  getSongs,
  deleteSong,
};
