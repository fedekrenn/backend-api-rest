const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    id: { type: String, required: true },
    timestamp: { type: Date, required: true },
    productos: { type: Array, required: true }
});

const CarritosModel = mongoose.model("carritos", Schema);

module.exports = { CarritosModel };