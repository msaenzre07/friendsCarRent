require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer'); // Importar multer
const path = require('path');

const {
  register,
  updateUser,
  getUserById,
} = require('./src/controllers/usuariosController');
const {
  createVehiculo,
  getAllVehiculos,
  getVehiculoById,
  updateVehiculoById,
  deleteVehiculoById,
} = require('./src/controllers/vehiculosController');
const {
  createReservacion,
  getAllReservaciones,
  getReservacionById,
  updateReservacionById,
  deleteReservacionById,
} = require('./src/controllers/ReservacionController');

const app = express();
const port = process.env.PORT || 3000;

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database Connected');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

// Configuración de Multer para almacenar archivos en el sistema de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  },
});

// Crear una instancia de multer con la configuración
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir archivos estáticos

app.post('/registro', register);
app.put('/usuarios', updateUser);
app.get('/usuarios/:id', getUserById);

app.post('/vehiculos', upload.single('file'), createVehiculo);
app.get('/vehiculos', getAllVehiculos);
app.get('/vehiculos/:id', getVehiculoById);
app.put('/vehiculos/:_id', upload.single('file'), updateVehiculoById); // Asegúrate de manejar el archivo en la actualización
app.delete('/vehiculos/:id', deleteVehiculoById);

app.post('/reservaciones', createReservacion);
app.get('/reservaciones', getAllReservaciones);
app.get('/reservaciones/:id', getReservacionById);
app.put('/reservaciones/:id', updateReservacionById);
app.delete('/reservaciones/:id', deleteReservacionById);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
