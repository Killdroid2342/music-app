const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { createUser, isUserExists, hashPassword } = require('../modal/user');
const bcrypt = require('bcrypt');

router.use(bodyParser.json());

router.post('/register-user', async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 12;
  const hashPasswordRes = await hashPassword(password, saltRounds);
  if ((await isUserExists(username)) == false) {
    createUser(username, hashPasswordRes);
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

router.post('/login-user', async (req, res) => {
  const { username, clientpassword } = req.body;
  console.log(await isUserExists(username));
  const { password } = await isUserExists(username);
  console.log(password);
});

module.exports = router;
