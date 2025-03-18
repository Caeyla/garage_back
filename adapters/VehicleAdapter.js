const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    registrationNumber: { type: String, required: true,unique: true },
    kilometers: { type: Number, required: true },
    transmission: { type: String, required: true },
    typeVehicle: { type: String, required: true },
    yearOfManufacture: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    customerId: { type: mongoose.Types.ObjectId, required: true ,ref : "Customer"}
  },
  {
    timestamps: true
  });
  
class VehicleAdapter {
  constructor() {
    this.model = mongoose.model('Vehicle', VehicleSchema);
  }

  async create(customerId,{
    brand,
    model,
    registrationNumber,
    kilometers,
    transmission,
    typeVehicle,
    yearOfManufacture}) {
    const newVehicle = new this.model({
      brand,
      model,
      registrationNumber,
      kilometers,
      transmission,
      typeVehicle,
      yearOfManufacture,
      customerId
    });
    await newVehicle.save();
    return { id: newVehicle._id };
  }

  async update(id,updatesToVehicle) {
    return await this.model.updateOne({ _id: id }, { $set: {...updatesToVehicle} });
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findByIdAndCustomerId(id,customerId) {
    return await this.model.findOne({ _id: id, customerId });
  }

  async findByCustomerId(customerId) {
    return await this.model.find({ customerId });
  }
}

module.exports = VehicleAdapter;
