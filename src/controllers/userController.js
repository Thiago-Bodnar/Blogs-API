const userService = require('../services/userService');

const userController = {
  async create(req, res) {
    await userService.validateBody(req.body);
    const token = await userService.create(req.body);

    res.status(201).json(token);
  },
};

module.exports = userController;