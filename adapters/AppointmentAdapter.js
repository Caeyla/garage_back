const mongoose = require('mongoose');
const Scope = require('../constant/Scope');
const AutoIncrement = require("mongoose-sequence")(mongoose)

const AppointmentSchema = new mongoose.Schema({
  numAppointment: { type: Number, unique: true },
  customerId: { type: mongoose.Types.ObjectId, required: true, ref: "Customer" },
  vehicleId: { type: mongoose.Types.ObjectId, required: true, ref: "Vehicle" },
  prestationId: { type: mongoose.Types.ObjectId, required: true, ref: "Prestation" },
  mechanicId: { type: mongoose.Types.ObjectId, required: true, ref: "Employee" },
  appointmentDate: { type: Date, required: true },
  appointmentParentId: { type: mongoose.Types.ObjectId, required: false, ref: "Appointment" },
  status: { type: Number, required: true }
},
  {
    timestamps: true
  }
);
AppointmentSchema.plugin(AutoIncrement, { inc_field: "numAppointment" });
class AppointmentAdapter {
  constructor() {
    this.model = mongoose.model('Appointment', AppointmentSchema);
  }

  async create({ customerId, vehicleId, prestationId, appointmentDate, status, mechanicId }) {
    const newAppointment = new this.model({
      customerId,
      vehicleId,
      prestationId,
      appointmentDate,
      mechanicId,
      status
    });
    await newAppointment.save();
    
    const retrieved = await this.model.findById(newAppointment._id)
      .populate("vehicleId")
      .populate("prestationId");
    console.log(retrieved);

    return retrieved;
  }

  async retrieveAppointmentsByMechanicId(mechanicId, scope = Scope.EXTENDED) {
    const query = this.model.find({ mechanicId });
    return this.handleScope(scope, query);
  }

  async findByIdAndCustomerId(id, customerId, scope = Scope.EXTENDED) {
    const query  = this.model
      .findOne({ _id: id, customerId });
    return this.handleScope(scope, query);
  }

  async findByCustomerIdAndFilter(filter, scope = Scope.EXTENDED) {
    const query = this.model.find({ ...filter });
    return this.handleScope(scope, query);
  }

  async findByVehicleId(vehicleId, scope = Scope.EXTENDED) {
    const query = this.model.find({ vehicleId })
    return this.handleScope(scope, query);
  }

  async findByMechanicId(mechanicId, scope = Scope.EXTENDED) {
    const query = this.model.find({ mechanicId });
    return this.handleScope(scope, query);
  }

  async update(id, updateAppointment) {
    return await this.model.updateOne({ _id: id }, { $set: { ...updateAppointment } });
  }


  async handleScope(scope,query) {
    if (scope === Scope.EXTENDED && query) {
        query.populate("vehicleId")
        .populate("prestationId")
        .populate("customerId");
    }
    return await query;
  }
}

module.exports = AppointmentAdapter;