const categoryService = require('../services/categoryService');

const categoryController = {
  async create(req, res) {
    const body = categoryService.validateBody(req.body);
    const newCategory = await categoryService.create(body);

    res.status(201).json(newCategory);
  },

  async list(_req, res) {
    const categories = await categoryService.list();

    res.status(200).json(categories);
  },
};

module.exports = categoryController;