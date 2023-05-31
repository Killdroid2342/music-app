const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();
const { uploadSongs } = require('../modal/song');

router.use(bodyParser.json());

router.post('/user-songs', async (req, res) => {
  const { username, date_added, songname, uuid } = req.body;
  console.log('you have hit the endpoint');
  console.log(username);
  console.log(date_added);
  console.log(songname);
  console.log(uuid);
  uploadSongs(username, date_added, songname, uuid);
});

module.exports = router;
