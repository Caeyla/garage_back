const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
    name: { type: String, required: true ,unique: true},
    amount: { type: Number, required: true }
},
{ timestamps: true } 
)

class ChargeAdapter {
    constructor() {
        this.model = mongoose.model('Charge', chargeSchema);
    }

    create({ name ,amount}) {
        return this.model.create({ name,amount });
    }

    findAll() {
        return this.model.find();
    }

    findById(id) {
        return this.model.findById(id);
    }
}

module.exports = ChargeAdapter;