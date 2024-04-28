const express = require("express");
const router = express.Router();
const connection = require('../database/db.js');
const vehiculosController = require('../controllers/vehiculosController.js');


// Definir rutas para vehículos y asociarlas con los controladores correspondientes
router.get(`/`, vehiculosController.getVehiculos);
router.post(`/create`, vehiculosController.createVehiculos);
router.put(`/update/:id`, vehiculosController.updateVehiculos);
router.delete(`/vehiculos/delete/:id`, vehiculosController.deleteVehiculos);


module.exports = router;












