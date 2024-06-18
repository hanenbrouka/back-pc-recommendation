  const jwt = require('jsonwebtoken');

  function generateToken(payload) {
    try {
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      return token;
    } catch (error) {
      console.error('Error generating token:', error);
      return null;
    }
  }

  async function verifyToken(token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }

  module.exports = { generateToken, verifyToken };
