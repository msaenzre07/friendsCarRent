const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculosController');

router.use('/api', vehiculosController);

module.exports = router;