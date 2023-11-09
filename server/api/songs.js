const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
require('dotenv').config();
const { uploadSongs, getSongs, deleteSong } = require('../modal/song');
const { s3 } = require('../util');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

router.use(bodyParser.json());
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
      console.log(file.fieldname, 'THIS IS FIELD NAME');
      console.log(file, 'THIS IS FILE');
    },
  }),
});

router.post('/upload-song', upload.single('files'), async (req, res) => {
  try {
    const { username, songname, UUID } = req.body;
    console.log(UUID, 'make this the name in the S3 bucket');

    const dateOfSongAdded = new Date();

    // Rename the uploaded file with the UUID as its name in the S3 bucket
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: UUID,
      Body: req.file.buffer,
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        console.error(err);
        res.status(500).send('Error uploading to S3');
      } else {
        // Save the song information in the database
        uploadSongs(username, dateOfSongAdded, songname, UUID);
        res.send({
          message: 'You have successfully uploaded song :)',
          UUID: UUID,
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('There has been an error uploading your songs :(');
  }
});

// GET SONGS FROM S3 AND DATABASE (MAKE IT MATCH)

router.post('/get-songs', async (req, res) => {
  const { clientUsername, UUID } = req.body;
  const { ID } = req.params;
  console.log(ID, 'THIS IS ID');
  console.log(UUID, 'This is UUID');
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
  };
  s3.listObjectsV2(params, function (err, data) {
    if (err) throw err;
    console.log(data);
  });
  console.log(params);
  const results = await getSongs(clientUsername);
  res.send(results);
});

router.get('/song/:ID', (req, res) => {
  const { ID } = req.params;
  console.log(ID, 'THIS IS ID');

  // console.log(ID);
  const pathUrl = path.join(__dirname, '../uploads/musicTMP/' + ID);
  console.log(__dirname, 'this is dirname');
  // console.log(__dirname);
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
