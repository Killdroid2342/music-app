const jwt = require('jsonwebtoken');
require('dotenv').config();

async function verifyToken(token) {
  try {
    const res = jwt.verify(token, process.env.acsessToken);
    return res;
  } catch (err) {
    return false;
  }
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
