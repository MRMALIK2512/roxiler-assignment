const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const axios = require('axios');
const transaction = require('../models/transaction');
require('dotenv').config();

const initializeDb = async () => {
    try{
        const response = await axios.get(process.env.DATA_URL);
        const data = response.data;
        console.log(data);
        await Transaction.deleteMany(); 
        await Transaction.insertMany(data); 
    }
    catch (err) { 
        console.log("error while initializing Data ");
        console.log(err);
    }
}

module.exports = initializeDb;