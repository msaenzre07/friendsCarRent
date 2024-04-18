const express = require("express");
const router = express.Router();
const path = require("path"); // Para importar el módulo 'path'
const db = require("../models/database.js");

const multer = require("multer");
// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/upload'); // Ruta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function(req, res){
// Maneja la carga de imágenes y devuelve la URL de la imagen
  const imageUrl =  "http://localhost:3001/"+ req.file.path; // URL de la imagen cargada
res.json({ imageUrl: imageUrl });
});


// Crear un vehículo
router.post("/create", async (req, res) => {
  try {
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const transmision = req.body.transmision;
    const kilometraje = req.body.kilometraje;
    const precioDia = req.body.precioDia;
    const sql =
      "INSERT INTO vehiculos (marca, modelo, transmision, kilometraje, precioDia) VALUES (?, ?, ?, ?, ?)";
    await db.query(sql, [marca, modelo, transmision, kilometraje, precioDia]);

    res.status(200).json({ message: "Vehículo registrado exitosamente" });
  } catch (err) {
    console.error("Error al registrar un vehículo: ", err);
    res
      .status(500)
      .json({ message: "Error al registrar un vehículo", error: err });
  }
});

//Actualizar vehículo
router.put("/update", async (req, res) => {
  try {
    const id = req.body.id;
    const marca = req.body.nombre;
    const modelo = req.body.modelo;
    const transmision = req.body.transmision;
    const kilometraje = req.body.kilometraje;
    const precioDia = req.body.precioDia;
    const file = req.body.file;
    const sql =
      "UPDATE vehiculos SET marca = ?, modelo = ?, transmision = ?, kilometraje = ?, precioDia = ?, file = ? WHERE id = ?";

    await db.query(sql, [
      marca,
      modelo,
      transmision,
      kilometraje,
      precioDia,
      file,
      id,
    ]);

    res.status(200).json({ message: "Vehículo actualizado con éxito" });
  } catch (err) {
    console.error("Error al actualizar un vehículo: ", err);
    res
      .status(500)
      .json({ message: "Error al actualizar un vehículo", error: err });
  }
});

//Obtener lista de vehículos
router.get("/vehiculos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM vehiculos");
    res.send(result); // Envía la lista de vehículos como respuesta
  } catch (err) {
    console.error("Error al obtener la lista de vehículos: ", err);
    res.status(500).send("Error al obtener la lista de vehículos");
  }
});

// Eliminar un vehículo
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM vehiculos WHERE id = ?";

  try {
    const result = await db.query(sql, [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Vehículo eliminado correctamente" });
    } else {
      res.status(404).json({ message: "El vehículo no existe" });
    }
  } catch (err) {
    console.error("Error al eliminar un vehículo: ", err);
  }
});

module.exports = {
  uploadImagen,
  crearVehiculo,
  actualizarVehiculo,
  obtenerVehiculos,
  eliminarVehiculo,
};
