const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ruta donde se guardarán los archivos
const uploadDir = path.join(__dirname, '..', 'uploads');

// Verificar si el directorio de carga existe, si no, crearlo
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Crear el directorio incluyendo subdirectorios si no existen
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Utilizar la variable uploadDir para el destino
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utilizar el nombre original del archivo
  }
});

// Filtro para asegurarse de que se sube un archivo
const fileFilter = (req, file, cb) => {
  if (file) {
    cb(null, true);
  } else {
    cb(new Error('No file provided'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
