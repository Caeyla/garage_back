const mongoose = require('mongoose');

const SpecialitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true }
},
    {
        timestamps: true
    }
);

class SpecialityAdapter {
    constructor() {
        this.model = mongoose.model('Speciality', SpecialitySchema);
    }
    async create({
        name
    }) {
        return await this.model.create({name});
    }
    async update(id, updatesToSpeciality) {
        return await this.model.updateOne({ _id: id, isActive: true }, { $set: { ...updatesToSpeciality } });
    }
    async findAll() {
        return await this.model.find({ isActive: true });
    }
    async findById(id) {
        return await this.model.findOne({ _id: id, isActive: true });
    }
    async findByIds(ids) {
        return await this.model.find({ _id: { $in: ids }, isActive: true });
    }
}

module.exports = SpecialityAdapter;