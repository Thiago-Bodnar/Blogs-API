const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');

const categoriesRoutes = Router();

categoriesRoutes.use(authController.validateToken);

categoriesRoutes.post('/', asyncHandler(categoryController.create));

module.exports = categoriesRoutes;