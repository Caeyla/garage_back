const mongoose = require('mongoose');
const Scope = require('../constant/Scope');
const AutoIncrement = require("mongoose-sequence")(mongoose)

const AppointmentSchema = new mongoose.Schema({
  numAppointment: { type: Number, unique: true },
  customerId: { type: mongoose.Types.ObjectId, required: true, ref: "Customer" },
  vehicleId: { type: mongoose.Types.ObjectId, required: true, ref: "Vehicle" },
  prestationId: { type: mongoose.Types.ObjectId, required: true, ref: "Prestation" },
  mechanicId: { type: mongoose.Types.ObjectId, required: false, ref: "Employee" }, // set to true after implementation
  appointmentDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
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

  async create({ customerId, vehicleId, prestationId, appointmentDate, endDate, status, mechanicId }) {
    const newAppointment = new this.model({
      customerId,
      vehicleId,
      prestationId,
      appointmentDate,
      endDate,
      mechanicId,
      status
    });
    await newAppointment.save();
    
    const retrieved = await this.model.findById(newAppointment._id)
      .populate("vehicleId")
      .populate("prestationId")
      .populate("customerId")
      .populate("mechanicId")
      ;
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

  async findById(id, scope = Scope.EXTENDED) {
    const query = this.model.findById(id);
    return this.handleScope(scope, query);
  }

  async findByIdAndMechanicId(id, mechanicId, scope = Scope.EXTENDED) {
    const query = this.model
      .findOne({ _id: id, mechanicId });
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
        .populate("customerId")
        .populate("mechanicId");
    }
    return await query;
  }
}

module.exports = AppointmentAdapter;