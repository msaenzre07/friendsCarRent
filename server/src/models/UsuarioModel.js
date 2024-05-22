const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombreCompleto: String,
    email: String,
    fechanacimiento: Date,
    phone: String,
    password: String,
    nacionalidad: String,
    cedula: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
