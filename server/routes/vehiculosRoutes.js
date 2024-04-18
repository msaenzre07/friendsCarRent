const express = require('express');
const router = express.Router();

const vehiculosController = require('../controllers/vehiculosController');



// Define las rutas usando el controlador de vehículos
router.post(`/vehiculos/create`,  vehiculosController.addVehiculos);
router.put(`/vehiculos/update/:id`, vehiculosController.updateVehiculos);
router.delete(`/vehiculos/delete/:id`, vehiculosController.deleteVehiculos);
router.get(`/`, vehiculosController.getVehiculos);// La ruta /vehiculos ya está incluida en el uso de app.use() en server.js



module.exports = router;