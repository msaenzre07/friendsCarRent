const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombreCompleto: String,
    email: String,
    fechanacimiento: Date,
    phone: String,
    password: String,
    nacionalidad: String,
    tipoIdentificacion: String,
    cedula: String,
    archivoLicencia: String  // Nuevo campo para el archivo de licencia
});

module.exports = mongoose.model('usuarios', UsuarioSchema);