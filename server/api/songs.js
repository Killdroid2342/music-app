const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const { s3 } = require('../util');
require('dotenv').config();
const { uploadSongs, getSongs, deleteSong } = require('../modal/song');

router.use(bodyParser.json());

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    UUID: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

router.post('/upload-song', upload.single('files'), async (req, res) => {
  try {
    const { username, songname, UUID } = req.body;
    const originalFileName = req.file.originalname; // Get the original filename
    console.log(originalFileName); // Log the original file name
    const dateOfSongAdded = new Date();
    console.log(req.file);

    uploadSongs(username, dateOfSongAdded, songname, UUID);
    res.send({
      message: 'You have successfully uploaded song :)',
      UUID: UUID,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: 'There has been an error uploading your songs :(',
    });
  }
});

// GET SONGS FROM S3 AND DATABASE (MAKE IT MATCH)

router.post('/get-songs', async (req, res) => {
  const { clientUsername } = req.body;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
  };
  s3.listObjects(params, function (err, data) {
    if (err) throw err;
    console.log(data);
  });
  console.log(params);
  const results = await getSongs(clientUsername);
  res.send(results);
});

router.get('/song/:ID', (req, res) => {
  const { ID } = req.params;
  const pathUrl = path.join(__dirname, process.env.AWS_BUCKET_NAME + ID);
  console.log(__dirname);
  res.sendFile(pathUrl);
});

router.delete('/song/:ID', async (req, res) => {
  const { ID } = req.params;
  const pathUrl = path.join(__dirname, '../uploads/musicTMP/' + ID);

  fs.unlink(pathUrl, async (e) => {
    if (e) {
      res.status(500).send('Error deleting song');
    } else {
      try {
        await deleteSong(ID);
        res.send('Song deleted successfully');
      } catch (e) {
        console.log(e);
        res.status(500).send('Error deleting song from the database');
      }
    }
  });
});

module.exports = router;
