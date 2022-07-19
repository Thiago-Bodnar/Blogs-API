const db = require('../database/models');
const categoryService = require('./categoryService');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

const join = [
  { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
  { model: db.Category, as: 'categories', through: { attributes: [] } },
];

const postsService = {
  validateBodyAdd(body) {
    const { title, content, categoryIds } = body;

    if (!title || !content || !categoryIds) { 
      throw new ValidationError('Some required fields are missing'); 
    }
    return body;
  },

  validateBodyEdit(body) {
    const { title, content } = body;

    if (!title || !content) { 
      throw new ValidationError('Some required fields are missing'); 
    }
    return body;
  },

  async validateCategories(categoryIds) {
    const existingCategories = await categoryService.getByIds(categoryIds);
    if (categoryIds.length !== existingCategories.length) {
      throw new ValidationError('"categoryIds" not found');
    }
  }, 

  async create(body, userId) {
    const { categoryIds, ...dataWhithoutIds } = body;

    await this.validateCategories(categoryIds);

    const [post, created] = await db.BlogPost.findOrCreate({
      where: {
        ...dataWhithoutIds,
        published: new Date(),
        updated: new Date(),
        userId,
      },
    });

    if (created) {
      await db.PostCategory.bulkCreate([
        { postId: post.id, categoryId: categoryIds[0] },
        { postId: post.id, categoryId: categoryIds[1] },
      ]);
    }

    return post;
  },

  async list() {
    const posts = await db.BlogPost.findAll({ include: join });

    return posts;
  },

  async get(id) {
    const post = await db.BlogPost.findByPk(id, { include: join });

    if (!post) throw new NotFoundError('Post does not exist');
    return post;
  },

  async edit(id, body) {
    const edited = await db.BlogPost.update({ 
      ...body, 
      updated: new Date() }, 
      { where: { id } });

    if (!edited) throw new NotFoundError('Post does not exist');

    const editedPost = await this.get(id);

    return editedPost;
  },

  async delete(id) {
    const deleted = await db.BlogPost.destroy({ where: { id } });

    if (!deleted) throw new NotFoundError('Post does not exist');
  },
};

module.exports = postsService;