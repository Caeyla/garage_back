const mongoose = require('mongoose');
const User = require('../domain/models/User');

const UserSchema = new mongoose.Schema({
  name: String,
  password: String
});

class UserMongoAdapter  {
   
}

module.exports = UserMongoAdapter;