const express = require ('express');
const app  = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//importar rutas incluir las demás PEND
const vehiculosRoutes = require('./routes/vehiculosRoutes.js');
const usuariosRoutes = require('./routes/usuariosRoutes.js'); 


// Rutas incluir las demás PEND
app.use('/vehiculos', vehiculosRoutes);
app.use('/login', usuariosRoutes );



// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Ocurrió un error en el servidor" });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});







