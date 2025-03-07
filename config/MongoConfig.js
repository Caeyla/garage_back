const mongoose = require('mongoose');

const connectToDb = (dbUrl) => { 
        mongoose.connect(dbUrl, {

        }).then(() => {
            console.log('MongoDB Connected ! ');
        })
        .catch((err) => {
            console.log('an error occured for MongoDB connection ',err);
        });
};

module.exports = connectToDb;