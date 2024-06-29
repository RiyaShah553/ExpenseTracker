const express = require('express');
const categoryController = require('../controllers/categoryCtrl');
const isAuthenticated = require('../middlewares/isAuth');

const categoryRouter = express.Router();

// ! for add
categoryRouter.post('/api/v1/categories/create', isAuthenticated, categoryController.create);

// ! for lists
categoryRouter.get('/api/v1/categories/lists', isAuthenticated, categoryController.lists);


// ! for update  
categoryRouter.put('/api/v1/categories/update/:id', isAuthenticated, categoryController.update);


// ! fro delete
categoryRouter.delete('/api/v1/categories/delete/:id', isAuthenticated, categoryController.delete);


module.exports = categoryRouter;