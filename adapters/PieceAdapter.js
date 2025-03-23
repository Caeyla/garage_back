const mongoose = require('mongoose');

const PieceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: {type:Number, required: true}
},
  {
    timestamps: true
  }
);

class PieceAdapter {
  constructor() {
    this.model = mongoose.model('Piece', PieceSchema);
  }

  async create({ name,price,description }) {
    const newPiece = new this.model({
      name,
      price,
      description
    });
    return await newPiece.save();
  }

  async update(id, updatesToPiece) {
    return await this.model.updateOne({ _id: id }, { $set: { ...updatesToPiece } });
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findAll() {
    return await this.model.find();
  }

}

module.exports = PieceAdapter;