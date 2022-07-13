const db = require('../database/models');
const jwtService = require('./jwtService');
const ValidationError = require('../errors/ValidationError');

const authService = {

  validateBody({ email, password }) {
    if (!email || !password) throw new ValidationError('Some required fields are missing');
  },

  async login(body) {
    const user = await db.User.findOne({
      where: { email: body.email, password: body.password },
    });

    if (!user || user.password !== body.password) throw new ValidationError('Invalid fields');

    const { password, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    if (!token) throw new ValidationError('Token not found');

    return { token };
  },
};

module.exports = authService;