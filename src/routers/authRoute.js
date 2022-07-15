const { Router } = require('express');
const asyncHandler = require('express-async-handler');

const authController = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/', asyncHandler(authController.login));

module.exports = authRouter;