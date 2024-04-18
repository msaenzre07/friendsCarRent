const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); 

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuración personalizada de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


//importar rutas incluir las demás PEND
const vehiculosRoutes = require('./routes/vehiculosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes'); 


// Rutas incluir las demás PEND
app.use('/vehiculos', vehiculosRoutes);
app.use('/login', usuariosRoutes );



 //Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Ocurrió un error en el servidor" });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});







