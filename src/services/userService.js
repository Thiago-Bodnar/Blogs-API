const Joi = require('joi');
const db = require('../database/models');
const { runSchema } = require('./validators');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const authService = require('./authService');

const usersService = {
  validateBody: runSchema(Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  })),

  async checkIfEmailExists(body) {
    const user = await db.User.findOne({
      where: { email: body.email },
    });
    if (user) throw new ConflictError('User already registered');
  },

  async create(body) {
    await this.checkIfEmailExists(body);
    const newUser = await db.User.create({ ...body });
    const token = await authService.login(newUser);
    return token;
  },

  async list() {
    const users = await db.User.findAll({ attributes: { exclude: ['password'] } });
    
    return users;
  },

  async get(id) {
    const user = await db.User.findByPk(id, { attributes: { exclude: ['password'] } });

    if (!user) throw new NotFoundError('User does not exist');
    return user;
  },

  async delete(id) {
    const deleted = await db.User.destroy({ where: { id } });

    if (!deleted) throw new NotFoundError('Post does not exist');
  },

};

module.exports = usersService;