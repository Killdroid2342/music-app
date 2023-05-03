const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { createUser, isUserExists } = require('../modal/user');

router.use(bodyParser.json());
router.post('/register-user', async (req, res) => {
  const { username, password } = req.body;
  //   console.log(await isUserExists(username));
  if ((await isUserExists(username)) == false) {
    createUser(username, password);
    res.send({
      message: 'Users created successfully',
    });
  } else {
    console.log('user exists. TRY AGAIN');
    res.send({
      message: 'Username already exists',
    });
  }
});

router.post('/login-user', async (req, res) => {});

module.exports = router;
