const express = require('express');
const router = express.Router();
const db = require('../models/vehiculosModel');
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    db(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
})
 const upload = multer ({
  storage: storage
 })
router.post('/upload', upload.single('image'),(req, res) =>{
  const image = req.file.filename;
  const sql = "UPDATE vehiculos SET image = ?";
  db.query(sql,[image], (err, result) => {
    if(err) return res.json({Message: "Error"});
    return res.json({Status: "Success"});

  })
})



// Crear un vehículo
router.post("/create",(req, res) => {
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const transmision = req.body.transmision;
    const kilometraje = req.body.kilometraje;
    const precioDia = req.body.precioDia;
    const imagen =  req.body.imagen;
    const sql = 'INSERT INTO vehiculos (marca, modelo, transmision, kilometraje, precioDia, imagen) VALUES (?, ?, ?, ?, ?, ?)';
 db.query(sql, [marca, modelo, transmision, kilometraje, precioDia, imagen], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al registrar un vehículo: ', err);
        res.status(500).json({ message: 'Error al registrar un vehículo' });
      } else {
        res.status(200).json({ message:'Vehículo registrado con éxito'});
    }
  });
});

//Actualizar vehículo
router.put("/update",(req, res) => {
  const id = re.body.id;
  const marca = req.body.nombre;
  const modelo = req.body.modelo;
  const transmision = req.body.transmision;
  const kilometraje = req.body.kilometraje;
  const precioDia = req.body.precioDia;
  const imagen =  req.body.imagen;
  const sql = 'UPDATE vehiculos SET marca = ?, modelo = ?, transmision = ?, kilometraje = ?, precioDia = ?, imagen = ? WHERE id = ?';
db.query(sql, [marca, modelo, transmision, kilometraje, precioDia, imagen, id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar un vehículo' });
    } else {
      res.status(200).json({ message: 'Vehículo actualizado con éxito' });
      }
    }
  );
});


//Obtener lista de vehículos
router.get('/vehiculos',(req, res) => {
  db.query('SELECT * FROM vehiculos',
   (err, result) => {
       if(err){
           console.log(err);
           res.status(500).send("Error al obtener la lista de vehículos");
       }else{
          res.send(result);// Envía la lista de vehículos como respuesta
       }
   }
   );   
});


// Eliminar un vehículo
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM vehiculos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar un vehículo: ', err);
      res.status(500).json({ message: 'Error al eliminar un vehículo' });
    } else {
      res.status(200).json({ message: 'Vehículo eliminado correctamente' });
    }
  });
});

module.exports = router;








