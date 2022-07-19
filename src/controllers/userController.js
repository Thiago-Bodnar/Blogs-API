const userService = require('../services/userService');
const jwtService = require('../services/jwtService');

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

  async get(req, res) {
    const { id } = req.params;

    const user = await userService.get(id);

    res.status(200).json(user);
  },

  async deleteMe(req, res) {
    const token = req.headers.authorization;
    const userId = jwtService.getUserId(token);
    await userService.delete(userId);

    res.sendStatus(204);
  },
};

module.exports = userController;