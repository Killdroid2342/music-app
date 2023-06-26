const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

require('dotenv').config();
const { uploadSongs } = require('../modal/song');

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

router.get('/song/:ID', (req, res) => {
  const { ID } = req.params;
  const pathUrl = path.join(__dirname, '../uploads/musicTMP/' + ID);
  res.sendFile(pathUrl);
});

module.exports = router;
