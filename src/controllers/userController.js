const userService = require('../services/userService');

const userController = {
  async create(req, res) {
    await userService.validateBody(req.body);
    const token = await userService.create(req.body);

    res.status(201).json(token);
  },

  async list(_req, res) {
    const users = await userService.list();

    res.status(200).json(users);
  },
};

module.exports = userController;