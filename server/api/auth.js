const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../modal/token');
const bodyParser = require('body-parser');
require('dotenv').config();
router.use(bodyParser.json());

router.post('/validate-token', async (req, res) => {
  console.log('This is validate token');
  const { token } = req.body;
  console.log(token);
  console.log(token);
  console.log(await verifyToken(token));
});

module.exports = router;
