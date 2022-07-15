const categoryService = require('../services/categoryService');

const categoryController = {
  async create(req, res) {
    const body = categoryService.validateBody(req.body);
    const newCategory = await categoryService.create(body);

    res.status(201).json(newCategory);
  },
};

module.exports = categoryController;