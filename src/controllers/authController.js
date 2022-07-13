const authService = require('../services/authService');

const authController = {
  async login(req, res) {
    authService.validateBody(req.body);
    const token = await authService.login(req.body);
    res.status(200).json(token); 
  },
};

module.exports = authController;