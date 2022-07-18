const db = require('../database/models');
const categoryService = require('./categoryService');
const ValidationError = require('../errors/ValidationError');

const postsService = {
  validateBody(body) {
    const { title, content, categoryIds } = body;

    if (!title || !content || !categoryIds) { 
      throw new ValidationError('Some required fields are missing'); 
    }
  },

  async create(body, userId) {
    const { categoryIds, ...dataWhithoutIds } = body;

    const existingCategories = await categoryService.getByIds(categoryIds);

    if (categoryIds.length !== existingCategories.length) {
      throw new ValidationError('"categoryIds" not found');
    }

    const [post, created] = await db.BlogPost.findOrCreate({
      where: { ...dataWhithoutIds, userId },
    });

    if (created) {
      await db.PostCategory.bulkCreate([
        { postId: post.id, categoryId: categoryIds[0] },
        { postId: post.id, categoryId: categoryIds[1] },
      ]);
    }

    return post;
  },
};

module.exports = postsService;