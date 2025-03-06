const mongoose = require('mongoose');
const User = require('../domain/models/User');

const UserSchema = new mongoose.Schema({
  name: String,
  password: String
});

class UserMongoAdapter  {
  constructor() {
    this.UserModel = mongoose.model('User', UserSchema);
  }

  async create(user) {
    const newUser = new this.UserModel(user);
    await newUser.save();
  }

  async findByName(name) {
    const user = await this.UserModel.findOne({ name });
    return new User(user.name, user.password);
  }
   
}

module.exports = UserMongoAdapter;