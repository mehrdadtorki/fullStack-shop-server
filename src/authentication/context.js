// authentication/Authentication.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const getUserFromToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const context = async ({ req }) => {
  const token = req.headers.authorization || '';
  const user = getUserFromToken(token.replace('Bearer ', ''));

  return { user };
};

module.exports = context;
