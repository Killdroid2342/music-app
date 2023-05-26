const express = require('express');
const router = express.Router();
const { verifyToken } = require('../modal/token');
const bodyParser = require('body-parser');
require('dotenv').config();
router.use(bodyParser.json());

router.post('/validate-token', async (req, res) => {
  console.log('This is validate token');
  const { token } = req.body;
  console.log(token);
  console.log(await verifyToken(token));
  if ((await verifyToken(token)) !== false) {
    res.send({
      message: 'correct token',
    });
  } else {
    res.send({
      message: 'invalid token',
    });
  }
});

module.exports = router;
