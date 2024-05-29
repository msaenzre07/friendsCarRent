const mongoose = require("mongoose");

const VehiculoSchema = new mongoose.Schema({
  marca: String, 
  modelo:  String,
  transmision:  String,
  kilometraje: Number,
  precioDia: Number,
  file: { type: String }  // Asumiendo que 'file' es una URL o ruta al archivo
});

module.exports = mongoose.model('Vehiculo', VehiculoSchema);