const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();

router.post('/validate-token', async (req, res) => {
  console.log('this is validate token');
});

module.exports = router;
