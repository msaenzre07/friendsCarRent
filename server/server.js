const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const app = express();
const multer = require('multer')
const connection = require('../server/src/database/db.js');


const vehiculosRoutes = require('../server/src/routes/vehiculosRoutes.js');

//settings
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Sevidor corriendo en el puerto: ${PORT}`);
});


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

// static files
app.use("/public", express.static(path.join(__dirname, 'public')));


// Rutas  incluir las demás PEND
app.use( vehiculosRoutes);

app.get('/', (req, res)=>{
  return res.json("Server is ready!")
})

app.get('/vehiculos',(req, res)=>{
  res.send(vehiculos)
})

//Configuración Images
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
});
 
const upload = multer({storage});
 
// Ruta para manejar la subida de imágenes
app.get('/vehiculos', upload.single('file'), (req, res) => {
  const imagePath = req.file.path.replace('public', ''); // Obtiene la ruta relativa de la imagen
  res.json({ imagePath }); // Devuelve la ruta de la imagen al cliente
});


































/*app.get('/', (req, res)=>{
  const sql = "SELECT * FROM vehiculos";
  connection.query(sql, (err, data)=>{
  if(err) return res.json(err);
})
});*/

