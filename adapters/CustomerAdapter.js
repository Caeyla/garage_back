const mongoose = require('mongoose');
const Customer = require('../domain/models/Customer');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, require: true }
});

class CustomerAdapter {
  constructor() {
    this.model = mongoose.model('Customer', CustomerSchema);
  }

  async create({name,firstName,email,password,birthDate,phone}) {
    const newCustomer = new this.model({
      name,
      firstName,
      email,
      password,
      birthDate,
      phone
    });
    await newCustomer.save();
    return { id: newCustomer._id };
  }

  async findByEmail(email) {
    return this.model.findOne({ email });
  }


}

module.exports = CustomerAdapter;