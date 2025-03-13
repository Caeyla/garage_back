const mongoose = require('mongoose');

const connectToDb = (MONGO_URI) => { 
    if(!MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
    }
        mongoose.connect(MONGO_URI, {

        }).then(() => {
            console.log('MongoDB Connected ! ');
        })
        .catch((err) => {
            console.log('an error occured for MongoDB connection ',err);
        });
};

module.exports = connectToDb;