const express = require('express');
const transactionController = require('../controllers/transactionCtrl');
const isAuthenticated = require('../middlewares/isAuth');

const transactionRouter = express.Router();

// ! for add
transactionRouter.post('/api/v1/transaction/create', isAuthenticated, transactionController.create);

// ! for getFiltertransaction
transactionRouter.get('/api/v1/transaction/lists', isAuthenticated, transactionController.getFilterTransaction);


// !  update by id in params
transactionRouter.put('/api/v1/transaction/update/:id', isAuthenticated, transactionController.update);



// ! Delete
transactionRouter.delete('/api/v1/transaction/delete/:id', isAuthenticated, transactionController.delete);


// ! 


module.exports = transactionRouter;