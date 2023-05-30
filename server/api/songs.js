const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();

router.post('/user-songs', async (req, res) => {
  console.log('you have hit the endpoint');
});

module.exports = router;
