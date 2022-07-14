const { Router } = require('express');
const asyncHandler = require('express-async-handler');

const usersController = require('../controllers/userController');

const usersRouter = Router();

// router.get('/', asyncHandler(usersController.list));
usersRouter.post('/', asyncHandler(usersController.create));
// router.get('/:id', usersController.findById);

module.exports = usersRouter;