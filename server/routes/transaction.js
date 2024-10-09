const express  = require('express');
const transactionRouter = express.Router();

const getTransactions = require('../controllers/transactions');

transactionRouter.get('/transactions' , getTransactions);



module.exports = transactionRouter;