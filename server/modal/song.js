const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'musicplayer',
});

const uploadSongs = async (username, date_added, songname, uuid) => {
  conn.query(
    'INSERT INTO songs (username, date_added, songname, UUID) VALUES (?,?,?,?)',
    [username, date_added, songname, uuid]
  );
};
const getSongs = async (username) => {
  const [rows, fields] = await conn
    .promise()
    .query('SELECT * FROM songs WHERE username = ?', [username]);
  return rows;
};

module.exports = {
  uploadSongs,
  getSongs,
};
