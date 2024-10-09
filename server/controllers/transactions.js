const mongoose = require('mongoose'); 
const Transaction = require('../models/transaction');
const monthMapping = require('../utils/monthMapping');



const getTransactions =  async (req, res) => {
    const { page="1" , perPage="10" , search , month = ''  } = req.query;
    const query = {};

    
    if (month && monthMapping[month]) {
        const monthNumber = monthMapping[month];
        query.$expr = {
            $eq: [{ $month: "$dateOfSale" }, monthNumber]
        };
    }

    
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } },
            {category: {$regex: search, $options: 'i'}}
        ];
    }

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));
        const totalCount = await Transaction.countDocuments(query);

        res.status(200).json({
            transactions,
            totalPages: Math.ceil(totalCount / perPage),
            currentPage: Number(page),
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Failed to fetch transactions.' });
    }
};



module.exports = getTransactions;
