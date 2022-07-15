const UnauthorizedError = require('../errors/UnauthorizedError');
const authService = require('../services/authService');
const jwtService = require('../services/jwtService');

const authController = {
  async login(req, res) {
    authService.validateBody(req.body);
    const token = await authService.login(req.body);
    res.status(200).json(token); 
  },

  validateToken(req, _res, next) {
    const token = req.headers.authorization;
    if (!token) throw new UnauthorizedError('Token not found');
    jwtService.validateToken(token);

    next();
  },
};

module.exports = authController;