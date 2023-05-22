const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../modal/token');
require('dotenv').config();

router.post('/validate-token', async (req, res) => {
  console.log('This is validate token');
  const { username } = req.body;

  try {
    const { clientUsername } = await verifyToken(username);
    if (clientUsername === username) {
      res.send('Good Token');
    } else {
      res.send('Bad Token');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
