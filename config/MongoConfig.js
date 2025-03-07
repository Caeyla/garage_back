const mongoose = require('mongoose');

const connectToDb = (dbUrl) => { 
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(() => {
            console.log('MongoDB Connected ! ');
        })
        .catch((err) => {
            console.log('an error occured for MongoDB connection ',err);
        });
};

module.exports = connectToDb;