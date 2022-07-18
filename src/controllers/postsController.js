const postsService = require('../services/postsService');
const jwtService = require('../services/jwtService');

const postsController = {
  async create(req, res) {
    const token = req.headers.authorization;
    const userId = jwtService.getUserId(token);
    postsService.validateBody(req.body);
    const newPost = await postsService.create(req.body, userId);

    res.status(201).json(newPost);
  },

  async list(_req, res) {
    const posts = await postsService.list();

    res.status(200).json(posts);
  },
};

module.exports = postsController;