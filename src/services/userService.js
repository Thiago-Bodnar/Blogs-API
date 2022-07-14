const Joi = require('joi');
const db = require('../database/models');
const { runSchema } = require('./validators');
const ConflictError = require('../errors/ConflictError');
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

};

module.exports = usersService;