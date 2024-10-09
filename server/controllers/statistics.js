const mongoose = require('mongoose'); 
const Transaction = require('../models/transaction');
const monthMapping = require('../utils/monthMapping');
const priceRanges = require('../utils/priceRanges');

// API endpoint for gettinff=
const getStatistics = async (month) => {

    try {
        let transactions;
        if (month) {
            const monthNumber = monthMapping[month];

             transactions = await Transaction.find({
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, monthNumber]
                }
            });
        }
        else{
            
             transactions = await Transaction.find({});
                
        }
        console.log(transactions);
        
        let totalSaleAmount = 0 ;
        let totalSoldItems = 0;
        let totalUnsoldItems = 0;

        
        transactions.forEach((transaction) => {
            if (transaction.sold) {
                totalSoldItems += 1;
                totalSaleAmount += parseFloat(transaction.price);
            } else {
                totalUnsoldItems += 1;
            }
        });

       totalSaleAmount = totalSaleAmount.toFixed(2);
        return{
            totalSaleAmount,
            totalSoldItems,
            totalUnsoldItems
            };
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return { message: 'Failed to fetch statistics.' }
    }
};



const getBarChartData = async (month) => {
    
    const priceRangesNew = {...priceRanges};
        try {
        let transactions;
        if (month) {
            const monthNumber = monthMapping[month];

            transactions = await Transaction.find({
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, monthNumber]
                }
            });
        }
        else{
            
            transactions = await Transaction.find({});
                
        }
        console.log(transactions);
        transactions.forEach(transaction => {
            const price = parseFloat(transaction.price);


            for (let range in priceRangesNew) {
                const [min, max] = range.split('-');

                if (isNaN(max)) {
                    if (price >= min) {
                        priceRangesNew[`${min}-${max}`] += 1;
                    }
                } else if (price >= min && price <= max) {
                    priceRangesNew[`${min}-${max}`] += 1;
                }
            }

        });


        return priceRangesNew;
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        return { message: 'Failed to fetch bar chart data.' }
    }
};




const getCategoryStats = async (month) => {
    
    const matchCondition = {};

    
    if (month && monthMapping[month]) {
        const monthNumber = monthMapping[month];
        
        matchCondition.$expr = {
            $eq: [{ $month: "$dateOfSale" }, monthNumber],
        };
    }

    try {
        
        const categoryStats = await Transaction.aggregate([
            { $match: matchCondition }, 
            {
                $group: {
                    _id: "$category", 
                    itemCount: { $sum: 1 }, 
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id", 
                    itemCount: 1, 
                },
            },
        ]);

        return categoryStats

    } catch (error) {
        console.error('Error fetching category stats:', error);
        return { message: 'Failed to fetch category statistics.' };
    }
};

const getCombinedStats = async (req,res) => {
    const { month } = req.query; 

    try {
        const stats = await getStatistics(month);
        const barChartData = await getBarChartData(month);
        const pieChartData = await getCategoryStats(month);

        const combinedResponse = {
            stats,
            barChartData,
            pieChartData,
        };

        res.status(200).json(combinedResponse);
    } catch (error) {
        console.error('Error fetching combined stats:', error);
        res.status(500).json({ message: 'Failed to fetch combined stats.' });
    }
};

module.exports = getCombinedStats;