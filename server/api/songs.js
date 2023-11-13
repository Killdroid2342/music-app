const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3');
require('dotenv').config();
const { uploadSongs, getSongs, deleteSong } = require('../modal/song');
const { s3 } = require('../util');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const { v4: uuidv4 } = require('uuid');

router.use(bodyParser.json());
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    Key: function (req, file, cb) {
      let UUID = uuidv4();
      cb(null, UUID);
    },
  }),
});

router.post('/upload-song', upload.single('files'), async (req, res) => {
  try {
    const { username, songname } = req.body;
    const UUID = req.file.key;

    const dateOfSongAdded = new Date();
    uploadSongs(username, dateOfSongAdded, songname, UUID);
    res.send({
      message: 'You have successfully uploaded song :)',
      UUID: UUID,
    });
  } catch (err) {
    console.error(err);
    res.send('There has been an error uploading your songs :(');
  }
});

router.post('/get-songs', async (req, res) => {
  const { clientUsername } = req.body;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
  };
  s3.listObjectsV2(params, function (err, data) {
    if (err) throw err;
  });

  const results = await getSongs(clientUsername);
  res.send(results);
});

router.delete('/song/:ID', async (req, res) => {
  const { ID } = req.params;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: ID,
  };
  try {
    await s3.headObject(params).promise();

    try {
      (await s3.deleteObject(params).promise()) && deleteSong(ID);

      res.send({
        message: 'Song deleted Successfully :)',
      });
    } catch (err) {
      res.send({
        message: 'Song deleted Successfully :)',
      });
    }
  } catch (err) {
    console.log('File not Found ERROR : ' + err.code);
  }
});

module.exports = router;
