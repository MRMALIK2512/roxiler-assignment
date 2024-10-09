const express = require('express');

const statsRouter = express.Router();
// const { getStatistics, getBarChartData , getCategoryStats} = require('../controllers/statistics');
const getCombinedStats = require('../controllers/statistics');


// statsRouter.get('/statistics', getStatistics);
// statsRouter.get('/bardata' , getBarChartData);
// statsRouter.get('/categorydata', getCategoryStats)

statsRouter.get('/combined-stats', getCombinedStats);

module.exports = statsRouter;
