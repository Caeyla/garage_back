const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  customerId: { type: mongoose.Types.ObjectId, required: true ,ref : "Customer"},
  vehicleId: { type: mongoose.Types.ObjectId, required: true ,ref : "Vehicle"},
  prestationIds : [{ type: mongoose.Types.ObjectId, required: true ,ref : "Prestation"}],
  appointmentDate : { type: Date, required: true },
  appointmentParentId : { type: mongoose.Types.ObjectId, required: false ,ref : "Appointment"},
  status : { type: Number, required: true }
},
  {
    timestamps: true
  }
);

class AppointmentAdapter {
  constructor() {
    this.model = mongoose.model('Appointment', AppointmentSchema);
  }

  async create({ customerId,vehicleId,prestationIds,appointmentDate,status }) {
    const newAppointment = new this.model({
      customerId,
      vehicleId,
      prestationIds,
      appointmentDate,
      status
    });
    await newAppointment.save();
    return await this.model.findById(newAppointment._id)
      .populate("vehicleId")
      .populate("prestationIds");
  }

  async findByIdAndCustomerId(id,customerId) {
    return await this.model
        .findOne({ _id: id, customerId })
        .populate("vehicleId")
        .populate("PrestationIds");
  }

  async findByCustomerId(customerId) {
    return await this.model.find({ customerId })
        .populate("vehicleId")
        .populate("prestationIds");
  }

  async findByVehicleId(vehicleId) {
    return await this.model.find({ vehicleId })
        .populate("Vehicle")
        .populate("Prestation");
  }

  async update(id, updateAppointment) {
    return await this.model.updateOne({ _id: id }, { $set: { ...updateAppointment } });
  }
}

module.exports = AppointmentAdapter;