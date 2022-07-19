const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');

const postsRouter = Router();

postsRouter.use(authController.validateToken);

postsRouter.get('/search', asyncHandler(postsController.search));
postsRouter.post('/', asyncHandler(postsController.create));
postsRouter.get('/', asyncHandler(postsController.list));
postsRouter.get('/:id', asyncHandler(postsController.get));
postsRouter.put('/:id', asyncHandler(postsController.edit));
postsRouter.delete('/:id', asyncHandler(postsController.delete));

module.exports = postsRouter;