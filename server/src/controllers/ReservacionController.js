const Reservar = require('../models/ReservaModel');
const Vehiculo = require('../models/VehiculoModel');

// Crear una nueva reserva
const createReservacion = async (req, res) => {
  const { cantidadDias, fechaInicial, fechaFinal, hora, lugar, id_vehiculo, id_usuario } = req.body;

  try {
    // Verificar disponibilidad del vehículo
    const reservas = await Reservar.find({
      id_vehiculo,
      $or: [
        { fechaInicial: { $lte: fechaFinal, $gte: fechaInicial } },
        { fechaFinal: { $lte: fechaFinal, $gte: fechaInicial } },
        { fechaInicial: { $lte: fechaInicial }, fechaFinal: { $gte: fechaFinal } }
      ]
    });

    if (reservas.length > 0) {
      return res.status(400).json({ error: 'El vehículo no está disponible en las fechas seleccionadas' });
    }

    const newReservacion = new Reservar({
      cantidadDias,
      fechaInicial,
      fechaFinal,
      hora,
      lugar,
      id_vehiculo,
      id_usuario
    });
    await newReservacion.save();
    res.status(201).json(newReservacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

// Obtener todas las reservas
const getAllReservaciones = async (req, res) => {
  try {
    const reservaciones = await Reservar.find().populate('id_vehiculo').populate('id_usuario');
    res.status(200).json(reservaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
};

// Obtener una reserva por ID
const getReservacionById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservacion = await Reservar.findById(id).populate('id_vehiculo').populate('id_usuario');
    if (!reservacion) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json(reservacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la reserva' });
  }
};

// Actualizar una reserva por ID
const updateReservacionById = async (req, res) => {
  const { id } = req.params;
  const { cantidadDias, fechaInicial, fechaFinal, hora, lugar, id_vehiculo, id_usuario } = req.body;

  try {
    // Verificar disponibilidad del vehículo
    const reservas = await Reservar.find({
      id_vehiculo,
      _id: { $ne: id },
      $or: [
        { fechaInicial: { $lte: fechaFinal, $gte: fechaInicial } },
        { fechaFinal: { $lte: fechaFinal, $gte: fechaInicial } },
        { fechaInicial: { $lte: fechaInicial }, fechaFinal: { $gte: fechaFinal } }
      ]
    });

    if (reservas.length > 0) {
      return res.status(400).json({ error: 'El vehículo no está disponible en las fechas seleccionadas' });
    }

    const updatedReservacion = await Reservar.findByIdAndUpdate(
      id,
      { cantidadDias, fechaInicial, fechaFinal, hora, lugar, id_vehiculo, id_usuario },
      { new: true }
    ).populate('id_vehiculo').populate('id_usuario');

    if (!updatedReservacion) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json(updatedReservacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};

// Eliminar una reserva por ID
const deleteReservacionById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservacion = await Reservar.findByIdAndDelete(id);
    if (!deletedReservacion) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json({ message: 'Reserva eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
};

module.exports = { createReservacion, getAllReservaciones, getReservacionById, updateReservacionById, deleteReservacionById
};
