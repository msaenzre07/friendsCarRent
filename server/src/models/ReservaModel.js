const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservaSchema = new mongoose.Schema({
    cantidadDias: { type: Number, required: true },
    fechaInicial: { type: Date, required: true },
    fechaFinal: { type: Date, required: true },
    hora: { type: String, required: true },
    lugar: { type: String, required: true },
    id_vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true
    },
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Datos_Usuarios',
        required: true
    }
});

module.exports = mongoose.model('reservas', ReservaSchema);
