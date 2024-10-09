const mongooose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongooose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connection established");
    })
    .catch((err) => {
        console.log(`Db connection failed ${err}`);
    });
};
module.exports = dbConnect;