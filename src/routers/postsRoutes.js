const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');

const postsRouter = Router();

postsRouter.use(authController.validateToken);

postsRouter.post('/', asyncHandler(postsController.create));
postsRouter.get('/', asyncHandler(postsController.list));
postsRouter.get('/:id', asyncHandler(postsController.get));
postsRouter.put('/:id', asyncHandler(postsController.edit));

module.exports = postsRouter;