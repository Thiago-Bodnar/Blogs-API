const postsService = require('../services/postsService');
const jwtService = require('../services/jwtService');
const authService = require('../services/authService');

const postsController = {
  async create(req, res) {
    const token = req.headers.authorization;
    const userId = jwtService.getUserId(token);
    const body = postsService.validateBodyAdd(req.body);
    const newPost = await postsService.create(body, userId);

    res.status(201).json(newPost);
  },

  async list(_req, res) {
    const posts = await postsService.list();

    res.status(200).json(posts);
  },

  async get(req, res) {
    const { id } = req.params;

    const post = await postsService.get(id);

    res.status(200).json(post);
  },

  async edit(req, res) {
    const { id } = req.params;
    const body = postsService.validateBodyEdit(req.body);
    const token = req.headers.authorization;
    const userId = jwtService.getUserId(token);
    await authService.validatePostOwner(id, userId);
    const editedPost = await postsService.edit(id, body);

    res.status(200).json(editedPost);
  },

  async delete(req, res) {
    const { id } = req.params;
    const token = req.headers.authorization;
    const userId = jwtService.getUserId(token);
    await authService.validatePostOwner(id, userId);
    await postsService.delete(id);

    res.sendStatus(204);
  },
};

module.exports = postsController;