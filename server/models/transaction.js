const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id : Number,
    title: String,
    price: String,
    description: String,
    category: String,
    image : String,
    sold : Boolean,
    dateOfSale: Date,
});

module.exports = mongoose.model('Transaction', transactionSchema);
