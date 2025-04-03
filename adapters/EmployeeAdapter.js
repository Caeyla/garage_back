const mongoose = require('mongoose');
const UserType = require('../domain/enumeration/UserType');


const UnavailabilitySchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  motif: { type: String, required: false },
  description: { type: String, required: false }
});
const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  income: { type: Number, required: true },
  userType: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  prestations: [{ type: mongoose.Types.ObjectId, required: true, ref: "Prestation" }],
  unavailableDates:[UnavailabilitySchema]
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
  
  async retrieveMechanicsByPrestationId(prestationId) {
    return await this.model.find({ userType: UserType.MECHANIC, prestations: prestationId}).populate("prestations");
  }
  
  async update(id,updatesToEmployee){
    return await this.model.updateOne({ _id: id, isActive: true }, { $set: {...updatesToEmployee} });
  }

  async findByIdWithoutSoftDelete(id) { return await this.model.findById(id); }
}

module.exports = EmployeeAdapter;