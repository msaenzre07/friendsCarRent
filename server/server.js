// server.js
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const { uploadFile } = require('./googleDriveService'); // Importa el servicio de Google Drive
const Vehiculo = require('./src/models/VehiculoModel'); // Ajusta el path según tu estructura de proyecto


const { register, login, logout, updateUser, getUserById } = require('./src/controllers/usuariosController');
const {
  createVehiculo,
  getAllVehiculos,
  getVehiculoById,
  updateVehiculoById,
  deleteVehiculoById
} = require('./src/controllers/vehiculosController');
const {
  createReservacion,
  getAllReservaciones,
  getReservacionById,
  updateReservacionById,
  deleteReservacionById
} = require('./src/controllers/ReservacionController');

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser({
  max: 1024 * 10,
}));
app.use((req, res, next) => {
  delete req.headers['x-auth-token'];
  next();
});
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database Connected');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/registro', register);
app.post('/login', login);
app.post('/logout', logout);
app.put('/usuarios/:id', updateUser);
app.get('/usuarios/:id', getUserById);

app.post('/vehiculos', upload.single('file'), async (req, res) => {
  try {
    const { marca, modelo, transmision, kilometraje, precioDia, disponible } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ Status: 'Error', error: 'Debes cargar una imagen para el vehículo' });
    }

    const uploadedFile = await uploadFile(file.path, file.mimetype);

    const newVehiculo = new Vehiculo({
      marca,
      modelo,
      transmision,
      kilometraje,
      precioDia,
      file: uploadedFile.id,
      disponible,
    });

    await newVehiculo.save();
    res.status(201).json({ Status: 'Success', vehiculo: newVehiculo });
  } catch (error) {
    console.error('Error al crear el vehículo:', error);
    res.status(500).json({ Status: 'Error', error: 'Error al crear el vehículo' });
  }
});

app.get('/vehiculos', getAllVehiculos);
app.get('/vehiculos/:id', getVehiculoById);
app.put('/vehiculos/:_id', upload.single('file'), updateVehiculoById);
app.delete('/vehiculos/:id', deleteVehiculoById);

app.post('/reservaciones', createReservacion);
app.get('/reservaciones', getAllReservaciones);
app.get('/reservaciones/:id', getReservacionById);
app.put('/reservaciones/:id', updateReservacionById);
app.delete('/reservaciones/:id', deleteReservacionById);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
