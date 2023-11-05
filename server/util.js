const mysql = require('mysql2');
function getDbConn() {
  return mysql.createConnection(process.env.DATABASE_URL);
}
module.exports = {
  getDbConn,
};
