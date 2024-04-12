const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');


//import routes
const vehiculosRoutes = require('./routes/vehiculosRoutes');



const app  = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


// Rutas
app.use('/', vehiculosRoutes);


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });