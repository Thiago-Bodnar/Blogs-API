require('dotenv/config');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const jwtService = {
  createToken(data) {
    const token = jwt.sign({ data }, process.env.JWT_SECRET, {});
    return token;
  },

  getUserId(token) {
    const { data } = jwt.decode(token);
    return data.id;
  },

  validateToken(token) {
    try {
      if (!token) throw new UnauthorizedError('Token not found');
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new UnauthorizedError('Expired or invalid token');
    }
  },
};

module.exports = jwtService;