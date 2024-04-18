const express = require('express');
const router = express.Router();

const vehiculosController = require('../controllers/vehiculosController');


// Desestructuración de las funciones del controlador
const {
    uploadImagen,
    addVehiculos,
    updateVehiculos,
    deleteVehiculos,
    getVehiculos,
  } = vehiculosController;



// Define las rutas usando el controlador de vehículos
router.post(`/create`,  addVehiculos);
router.put(`/update/:id`, updateVehiculos);
router.delete(`/vehiculos/delete/:id`, deleteVehiculos);
router.get(`/`, getVehiculos);// La ruta vehiculos ya está incluida en el uso de app.use() en server.js
router.post(`/upload`, uploadImagen);// Manejar la carga de imágenes y devolver la URL de la imagen


module.exports = router;