const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
    name: { type: String, required: true ,unique: true}
},
{ timestamps: true } 
)

class ChargeAdapter {
    constructor() {
        this.model = mongoose.model('Charge', chargeSchema);
    }

    create({ name }) {
        return this.model.create({ name });
    }

    findAll() {
        return this.model.find();
    }

    findById(id) {
        return this.model.findById(id);
    }
}

module.exports = ChargeAdapter;