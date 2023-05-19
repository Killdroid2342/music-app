const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();

router.post('/validate-token', async (req, res) => {
  console.log('hello');
});

module.exports = router;
