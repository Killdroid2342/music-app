const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../modal/token');
require('dotenv').config();

router.post('/validate-token', async (req, res) => {
  console.log('This is validate token');
  const { token } = req.body;

  try {
    console.log(token);

    const decodedToken = jwt.verify(token, process.env.acsessToken);
    const { username } = decodedToken;

    const { clientUsername } = await verifyToken(username);
    if (clientUsername === username) {
      res.send('Good Token');
    } else {
      res.send('Bad Token');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error validating token');
  }
});

module.exports = router;
