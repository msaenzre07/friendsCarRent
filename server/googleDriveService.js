const { google } = require('googleapis');
const credentials = require('./credentials.json');
const { Readable } = require('stream'); // Agrega esta línea para importar Readable

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth: auth });

const uploadFile = async (fileData, mimeType) => {
  try {
    const media = {
      mimeType: mimeType,
      body: Readable.from(fileData.buffer), // Convierte el búfer en un flujo de datos legible
    };

    const response = await drive.files.create({
      requestBody: {
        name: fileData.originalname,
        mimeType: mimeType
      },
      media: media
    });

    return response.data;
    
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw error;
  }
};
const getFileUrl = async (fileId) => {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink'
    });
    return response.data.webViewLink;
  } catch (error) {
    console.error('Error getting file URL from Google Drive:', error);
    throw error;
  }
};

module.exports = {
  uploadFile,getFileUrl
};