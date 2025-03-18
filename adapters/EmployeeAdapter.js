const mongoose = require('mongoose');



const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  income: { type: Number, required: true },
  userType: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true }
  // unvailableDate:[unvailables]
},
  {
    timestamps: true
  });

class EmployeeAdapter {
  constructor() {
    this.model = mongoose.model('Employee', EmployeeSchema);
  }

  async create({name,firstName,email,password,income,userType}) {
    const newEmployee = new this.model({
      name,
      firstName,
      email,
      password,
      income,
      userType
    });
    return await newEmployee.save();
  }

  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async update(id,updatesToEmployee){
    return await this.model.updateOne({ _id: id }, { $set: {...updatesToEmployee} });
  }
}

module.exports = EmployeeAdapter;