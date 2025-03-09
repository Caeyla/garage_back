const mongoose = require('mongoose');
const Employee = require('../domain/models/Employee');


const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  income: { type: Number, required: true },
  type: { type: String, required: true },
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

  async create(employee) {
    const newEmployee = new this.model(employee);
    await newEmployee.save();
  }

  async findByName(name) {
    const employee = await this.model.findOne({ name });
    return new Employee(employee.name, employee.password);
  }

  async deleteAll() {
    await this.model.deleteMany({});
  }

}

module.exports = EmployeeAdapter;