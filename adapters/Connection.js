require('dotenv').config();
const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

function connect() {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Database connected');
  });
  return db;
}

module.exports.connect = connect;