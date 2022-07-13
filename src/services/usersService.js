const db = require('../database/models');
const NotFoundError = require('../errors/NotFoundError');

const usersService = {

  validateBody({ email, password }) {
    if (!email || !password) throw new NotFoundError('Some required fields are missing');
  },

  async login({ email, password }) {
    const user = await db.user.findOne({ where: { email } });

    if (!user || user.password !== password) throw new NotFoundError('Invalid fields');
  },
};

module.exports = usersService;