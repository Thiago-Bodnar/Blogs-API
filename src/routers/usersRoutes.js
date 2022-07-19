const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/authController');

const usersController = require('../controllers/userController');

const usersRouter = Router();

usersRouter.post('/', asyncHandler(usersController.create));

usersRouter.use(authController.validateToken);

usersRouter.get('/', asyncHandler(usersController.list));
usersRouter.get('/:id', asyncHandler(usersController.get));
usersRouter.delete('/me', asyncHandler(usersController.deleteMe));

module.exports = usersRouter;