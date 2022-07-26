const Joi = require('joi');
const db = require('../database/models');
const { runSchema } = require('./validators');

const categoryService = {
  validateBody: runSchema(Joi.object({
    name: Joi.string().required(),
  })),

  async create(body) {
    const newCategory = await db.Category.create({ ...body });

    return newCategory;
  },

  async list() {
    const categories = await db.Category.findAll();

    return categories;
  },

  async getByIds(ids) {
    const categoryIds = await db.Category.findAll({ where: { id: ids } });

    return categoryIds;
  },
};

module.exports = categoryService;