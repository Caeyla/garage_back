const mongoose = require('mongoose');
const Customer = require('../domain/models/Customer');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true},
  password: { type: String, required: true },
  firstname:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  password:{type:String, required:true},
  birthday:{type:Date, required:true},
  isActive:{type:Boolean, require:true}
});

class CustomerAdapter  {
  constructor() {
    this.model = mongoose.model('Customer', CustomerSchema);
  }

  create(customer) {
    const newCustomer = new this.model(customer);
    newCustomer.save().then((data) => console.log(data)).catch((err) => console.log(err));
  }

  async findByName(name) {
    const customer = await this.model.findOne({ name });
    return new Customer(customer.name, customer.password);
  }

  async deleteAll() {
    await this.model.deleteMany({});
  }

}

module.exports = CustomerAdapter;