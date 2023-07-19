const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

require('dotenv').config();
const { uploadSongs, getSongs, deleteSong } = require('../modal/song');

router.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/musicTMP');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post('/upload-song', upload.single('files'), async (req, res) => {
  try {
    const { username, songName } = req.body;
    const musicFileName = req.file.filename;
    const dateOfSongAdded = new Date();
    uploadSongs(username, dateOfSongAdded, songName, musicFileName);
    res.send({
      message: 'You have successfully uploaded song :)',
      musicFileName: musicFileName,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: 'There has been an error uploading your songs :(',
    });
  }
});
router.post('/get-songs', async (req, res) => {
  const { username } = req.body;
  console.log(username);

  const results = await getSongs(username);
  res.send(results);
});
router.delete('/song/:ID', async (req, res) => {
  const { ID } = req.params;
  const pathUrl = path.join(__dirname, '../uploads/musicTMP/' + ID);

  fs.unlink(pathUrl, async (e) => {
    if (e) {
      console.log(e);
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

router.get('/song/:ID', (req, res) => {
  const { ID } = req.params;
  const pathUrl = path.join(__dirname, '../uploads/musicTMP/' + ID);
  res.sendFile(pathUrl);
});

module.exports = router;
