const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
    nombreCompleto: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fechanacimiento: { type: Date, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    nacionalidad: { type: String, required: true },
    tipoIdentificacion: { type: String, required: true },
    cedula: { type: String, required: true },
    archivoLicencia: { type: String },
    rol: { type: String, required: true, enum: ['admin', 'user', 'guest'], default: 'user' },
    estado: { type: String, required: true, enum: ['activo', 'inactivo'], default: 'activo' }
});

UsuarioSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

module.exports = mongoose.model('usuarios', UsuarioSchema);