const mongoose = require('mongoose');

const PrestationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  specialities: [{ type: mongoose.Types.ObjectId, required: true, ref: "Speciality" }],
  isActive: {type: Boolean, required: true, default: true}
},
  {
    timestamps: true
  }
);

class PrestationAdapter {
  constructor() {
    this.model = mongoose.model('Prestation', PrestationSchema);
  }

  async create({ name,description, price, duration }) {
    const newPrestation = new this.model({
      name,
      description,
      price,
      duration
    });
    return await newPrestation.save();

  }

  async findById(id) {
    return await this.model
      .findOne({ _id: id, isActive: true })
      .populate("specialities");
  }

  async findByIds(ids) {
    return await this.model
      .find({ _id: { $in: ids }, isActive: true }).populate("specialities");
  }

  async findAll() {
    return await this.model.find({ isActive: true }).populate("specialities");
  }

  async update(id, updatesToPrestation) {
    return await this.model.updateOne({ _id: id, isActive: true }, { $set: { ...updatesToPrestation } });
  }
}

module.exports = PrestationAdapter;