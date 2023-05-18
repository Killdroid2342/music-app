const jwt = require('jsonwebtoken');
require('dotenv').config();

async function verifyToken(username) {
  const res = jwt.verify(username, process.env.acsessToken);
  return res;
}

const jwtToken = (username) => {
  const jwtSignin = jwt.sign(
    {
      username,
    },
    process.env.acsessToken,
    { expiresIn: '7d' }
  );
  return jwtSignin;
};
module.exports = {
  verifyToken,
  jwtToken,
};
