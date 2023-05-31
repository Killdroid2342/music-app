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

module.exports = {
  uploadSongs,
};
