const mysql = require('mysql2');
const AWS = require('aws-sdk');

function getDbConn() {
  return mysql.createConnection(process.env.DATABASE_URL);
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_BUCKET_NAME,
});

module.exports = {
  getDbConn,
  s3,
};
