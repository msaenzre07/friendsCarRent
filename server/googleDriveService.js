// googleDriveService.js
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Ruta al archivo de credenciales de la cuenta de servicio
const credentialsPath = path.join(__dirname, 'credentials.json');
if (!fs.existsSync(credentialsPath)) {
  throw new Error(`No se encontró el archivo de credenciales en la ruta: ${credentialsPath}`);
}

// Leer y parsear las credenciales de la cuenta de servicio
const credentials = JSON.parse(fs.readFileSync(credentialsPath));

// Autenticar con una cuenta de servicio
const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

// Crear una instancia de Google Drive API
const drive = google.drive({ version: 'v3', auth: auth });

// Función para subir un archivo a Google Drive
const uploadFile = async (filePath, mimeType) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: path.basename(filePath),
        mimeType: mimeType
      },
      media: {
        mimeType: mimeType,
        body: fs.createReadStream(filePath)
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

module.exports = {
  uploadFile
};
