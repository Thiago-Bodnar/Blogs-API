const authService = require('../services/authService');
const jwtService = require('../services/jwtService');

const authController = {
  async login(req, res) {
    authService.validateBody(req.body);
    const token = await authService.login(req.body);
    res.status(200).json(token); 
  },

  validateToken(req, res, next) {
    const { authorization } = req.headers;

    jwtService.validateToken(authorization);

    next();
  },
};

module.exports = authController;