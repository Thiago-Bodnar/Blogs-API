const db = require('../database/models');
const jwtService = require('./jwtService');
const postsService = require('./postsService');
const ValidationError = require('../errors/ValidationError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const authService = {

  validateBody(body) {
    if (!body.email || !body.password) { 
      throw new ValidationError('Some required fields are missing'); 
    }
  },

  async login(body) {
    const user = await db.User.findOne({
      where: { email: body.email, password: body.password },
    });

    if (!user || user.password !== body.password) throw new ValidationError('Invalid fields');

    const { password, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    return { token };
  },

  async validatePostOwner(postId, userId) {
    const postToDelete = await postsService.get(postId);

    if (userId !== postToDelete.userId) throw new UnauthorizedError('Unauthorized user');
  },
};

module.exports = authService;