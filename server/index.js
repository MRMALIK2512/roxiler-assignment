const express = require('express');

const cors = require('cors');
const transactionRoutes = require('./routes/transaction');
const  dbConnect  = require('./config/dbconfig');
const  initializeDb  = require('./config/initializeDb');
const statsRouter = require('./routes/statistics');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

dbConnect();
initializeDb();

app.use('/api', transactionRoutes);
app.use('/api', statsRouter);

app.listen(PORT , () => {
    console.log(`Server Running on port ${PORT}`);
});