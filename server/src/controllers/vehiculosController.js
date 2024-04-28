const Vehiculo= require('../models/Vehiculo');  // Importa el modelo de Vehículo
const connection = require('../database/db.js');
const bodyParser = require('body-parser');
const express = require("express");
const router = express.Router();
const path = require("path"); // Para importar el módulo 'path'
const multer = require("multer");



// Controlador para obtener  los vehículos
const getVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find(); // Busca todos los vehículos en la base de datos
    res.json(vehiculos); // Devuelve los vehículos como respuesta
  } catch (error) {
    res.status(500).json({ message: error.message }); // Maneja los errores
  }
};

// Controlador para crear un nuevo vehículo
const createVehiculos = async (req, res) => {
  const vehiculo = new Vehiculo({
    marca: req.body.marca,
    modelo: req.body.modelo,
    transmision: req.body.transmision,
    kilometraje: req.body.kilometraje,
    precioDia: req.body.precioDia,
    file: req.body.file
  });
  try {
    const nuevoVehiculo = await Vehiculo.createVehiculo(); // Pasar el objeto vehiculo creado, Guarda el nuevo vehículo en la base de datos
    res.status(201).json(nuevoVehiculo); // Devuelve el vehículo recién creado como respuesta
  } catch (error) {
    res.status(400).json({ message: error.message }); // Maneja los errores
  }
};

// Controlador para actualizar un vehículo existente
const updateVehiculos = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id); // Busca el vehículo por ID
    if (vehiculo == null) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    // Actualiza los campos del vehículo con los datos del cuerpo de la solicitud
    vehiculo.marca = req.body.marca;
    vehiculo.modelo = req.body.modelo;
    vehiculo.transmision = req.body.transmision;
    vehiculo.kilometraje = req.body.kilometraje;
    vehiculo.precioDia = req.body.precioDia;
    vehiculo.file = req.body.file;
    const vehiculoActualizado = await Vehiculo.updateVehiculo(); // Guarda los cambios en la base de datos
    res.json(vehiculoActualizado); // Devuelve el vehículo actualizado como respuesta
  } catch (error) {
    res.status(400).json({ message: error.message }); // Maneja los errores
  }
};


// Controlador para eliminar un vehículo
const deleteVehiculos= async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id); // Busca el vehículo por ID
    if (vehiculo == null) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    await vehiculo.remove(); // Elimina el vehículo de la base de datos
    res.json({ message: 'Vehículo eliminado' }); // Devuelve un mensaje de éxito
  } catch (error) {
    res.status(500).json({ message: error.message }); // Maneja los errores
  }
};



// Exporta los controladores
module.exports = {
  getVehiculos,
  createVehiculos,
  updateVehiculos,
  deleteVehiculos
};
