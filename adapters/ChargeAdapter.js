const mongoose = require('mongoose');

const chargeDetailsSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: false }
})
const chargeSchema = new mongoose.Schema({
    name: { type: String, required: true ,unique: true},
    details: [chargeDetailsSchema]
},
{ timestamps: true } 
)

class ChargeAdapter {
    constructor() {
        this.model = mongoose.model('Charge', chargeSchema);
    }

    async create({ name }) {
        return await this.model.create({name});
    }

    async addDetailsUsingChargeId({ chargeId, date, amount, description }) {
        const charge = await this.model.findById(chargeId);
        charge.details.push({ date, amount, description });
        return await charge.save();
    }

    async findAll() {
        return await this.model.find();
    }

    async findById(id) {
        return await  this.model.findById(id);
    }
}

module.exports = ChargeAdapter;