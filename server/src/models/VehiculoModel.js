const mongoose = require("mongoose");

const VehiculoSchema = new mongoose.Schema({
  marca: String, 
  modelo:  String,
  transmision:  String,
  kilometraje: Number,
  precioDia: Number,
  file:  String  ,
  disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model('vehiculos', VehiculoSchema);