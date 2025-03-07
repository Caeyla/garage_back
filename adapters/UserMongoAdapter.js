const mongoose = require('mongoose');
const User = require('../domain/models/User');

const UserSchema = new mongoose.Schema({
  name: String,
  password: String
});

class UserMongoAdapter  {
  constructor() {
    this.model = mongoose.model('User', UserSchema);
  }

  async create(user) {
    const newUser = new this.model(user);
    await newUser.save();
  }

  async findByName(name) {
    const user = await this.model.findOne({ name });
    return new User(user.name, user.password);
  }

  async deleteAll() {
    await this.model.deleteMany({});
  }
}

module.exports = UserMongoAdapter;