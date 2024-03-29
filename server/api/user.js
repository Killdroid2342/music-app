const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();

const {
  createUser,
  isUserExists,
  hashPassword,
  comparePassswords,
  deleteUser,
  searchUsers,
  FollowingUsers,
  checkIfFollowing,
  FollowUser,
  UnfollowUser,
} = require('../modal/user');

const { jwtToken } = require('../modal/token');

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
    res.send({
      message: 'Username already exists',
    });
  }
});

router.post('/login-user', async (req, res) => {
  const { username, clientpassword } = req.body;
  const { password } = await isUserExists(username);
  try {
    if (
      (await isUserExists(username)) !== false &&
      (await comparePassswords(clientpassword, password)) == true
    ) {
      res.send({
        message: 'Correct details. Welcome',
        token: jwtToken(username),
      });
    } else {
      res.send({
        message: 'Incorrect login. Try Again',
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/delete-user', async (req, res) => {
  const { username } = req.body;
  try {
    await deleteUser(username);
    res.send({
      message: 'User account deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'An error occurred while deleting the user account',
    });
  }
});

router.post('/search', async (req, res) => {
  const { searchItem } = req.body;
  const matchingItems = await searchUsers(searchItem);
  res.status(200).send(matchingItems);
});

router.post('/following-user', async (req, res) => {
  const { username, target_user } = req.body;
  if ((await checkIfFollowing(username, target_user)) == false) {
    FollowUser(username, target_user);
  } else {
    console.log('already following');
  }
});

router.get('/following-users/:user', async (req, res) => {
  try {
    const { user } = req.params;
    res.send(await FollowingUsers(user));
  } catch (e) {
    res.send([]);
  }
});
router.post('/unfollow-user', async (req, res) => {
  const { username, target_user } = req.body;
  try {
    await UnfollowUser(username, target_user);
    res.send({
      message: 'User unfollowed successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'An error occurred while unfollowing the user',
    });
  }
});
module.exports = router;
