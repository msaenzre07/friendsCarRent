require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');


const upload = require('./src/middleware/uploadjs'); // Importa el middleware de multer
const { uploadFile } = require('./googleDriveService');

const usuariosController = require('./src/controllers/usuariosController');
const vehiculosController = require('./src/controllers/vehiculosController');
const reservacionesController = require('./src/controllers/ReservacionController');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Database Connected'); })
  .catch((error) => { console.error('Error connecting to database:', error); });

// Rutas de la API
app.post('/registro', usuariosController.register);
app.post('/login', usuariosController.login);
app.post('/logout', usuariosController.logout);
app.put('/usuarios/:id', usuariosController.updateUser);
app.get('/usuarios/:id', usuariosController.getUserById);


app.use(upload.single('file'));
app.post('/upload', async (req, res) => {
  try {
    const fileUrl = await uploadFile(req.file);
    res.status(200).json({ fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});


app.post('/vehiculos', vehiculosController.createVehiculo);
app.get('/vehiculos', vehiculosController.getAllVehiculos);
app.get('/vehiculos/:id', vehiculosController.getVehiculoById);
app.put('/vehiculos/:id', vehiculosController.updateVehiculoById);
app.delete('/vehiculos/:id', vehiculosController.deleteVehiculoById);

app.post('/reservaciones', reservacionesController.createReservacion);
app.get('/reservaciones', reservacionesController.getAllReservaciones);
app.get('/reservaciones/:id', reservacionesController.getReservacionById);
app.put('/reservaciones/:id', reservacionesController.updateReservacionById);
app.delete('/reservaciones/:id', reservacionesController.deleteReservacionById);

// Iniciar el servidor
app.listen(port, () => { console.log(`Server started at port ${port}`); });
