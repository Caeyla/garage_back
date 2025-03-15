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

  async create({
    brand,
    model,
    registrationNumber,
    kilometers,
    transmission,
    typeVehicle,
    yearOfManufacture,
    customerId
  }) {
    const customerIdAsObjectId = new mongoose.Types.ObjectId(customerId);
    const newVehicle = new this.model({
      brand,
      model,
      registrationNumber,
      kilometers,
      transmission,
      typeVehicle,
      yearOfManufacture,
      customerIdAsObjectId
    });
    return await newVehicle.save();
  }

  async update(id,updatesToVehicle) {
    return await this.model.updateOne({ _id: id }, { $set: {...updatesToVehicle} });
  }

  async findById(id) {
    return await this.model.findById(id);
  }

}

module.exports = VehicleAdapter;
