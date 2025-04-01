const mongoose = require('mongoose');
const UserType = require('../domain/enumeration/UserType');



const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  income: { type: Number, required: true },
  userType: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  prestations: [{ type: mongoose.Types.ObjectId, required: true, ref: "Prestation" }],
  unvailableDates:[{ type: Date, required: true }]
},
  {
    timestamps: true
  });

class EmployeeAdapter {
  constructor() {
    this.model = mongoose.model('Employee', EmployeeSchema);
  }

  async create({name,firstName,email,password,income,userType,prestations}) {
    const newEmployee = new this.model({
      name,
      firstName,
      email,
      password,
      income,
      userType,
      prestations
    });
    return await newEmployee.save();
  }

  async findByEmail(email) {
    return await this.model.findOne({ email, isActive: true });
  }

  async findById(id) {
    return await this.model.findOne({ _id: id, isActive: true }).populate("prestations");
  }

  async retrieveAllMechanic() {
    return await this.model.find({ userType: UserType.MECHANIC}).populate("prestations");
  }

  async retriveMechanicsByPrestation(prestationId) {
    return await this.model.find({ userType: UserType.MECHANIC, prestations: prestationId}).populate("prestations");
  }
  
  async update(id,updatesToEmployee){
    return await this.model.updateOne({ _id: id, isActive: true }, { $set: {...updatesToEmployee} });
  }
}

module.exports = EmployeeAdapter;