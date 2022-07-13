const { Router } = require('express');
const asyncHandler = require('express-async-handler');

const authController = require('../controllers/authController');

const authRouter = Router();

// router.get('/', asyncHandler(usersController.list));
authRouter.post('/', asyncHandler(authController.login));
// router.get('/:id', usersController.findById);

module.exports = authRouter;