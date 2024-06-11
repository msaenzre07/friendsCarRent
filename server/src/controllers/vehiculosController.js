const Vehiculo = require('../models/VehiculoModel');
const { uploadFile,getFileUrl } = require('../../googleDriveService');
const upload = require('../middleware/uploadjs');

const createVehiculo = async (req, res) => {
  console.log(req.file);
  try {
    const { marca, modelo, transmision, kilometraje, precioDia, disponible, pasajeros } = req.body;
    const file = req.file;
    console.log(file);
    if (file) {
      console.log("111");
      const uploadedFile = await uploadFile(file, file.mimetype);
      req.body.file = uploadedFile.name || uploadedFile.data.name;
     
    }
    console.log(marca, file);

    const newVehiculo = new Vehiculo({
      marca,
      modelo,
      transmision,
      kilometraje,
      precioDia,
      disponible,
      file: req.body.file,
      pasajeros,
    });

    await newVehiculo.save();
    res.status(201).json({ status: 'Success', vehiculo: newVehiculo });
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'Error al crear vehículo', error: error.message });
  }
};

const getAllVehiculos = async (req, res) => {
  try {
    // Obtener todos los vehículos de la base de datos
    const vehiculos = await Vehiculo.find();

    // Mapear cada vehículo para obtener la URL de la imagen desde Google Drive
   // const vehiculosConImagenes = await Promise.all(vehiculos.map(async (vehiculo) => {
      // Verificar si hay un archivo asociado al vehículo
     // if (vehiculo.file) {
        // Obtener la URL de la imagen desde Google Drive
      //  const fileMetadata = await drive.files.get({ fileId: vehiculo.file, fields: 'webViewLink' });
       // return {
       //   ...vehiculo.toJSON(),
       //   imagenUrl: fileMetadata.data.webViewLink // Agregar la URL de la imagen al objeto del vehículo
      //  };
      //} else {
       // return vehiculo.toJSON(); // Si no hay archivo, devolver solo los datos del vehículo sin la URL de la imagen
     // }
   
   // }));

    // Devolver los vehículos con las URLs de las imágenes
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los vehículos' });
  }
};




const getVehiculoById = async (req, res) => {
  const { id } = req.params;

  try {
    const vehiculo = await Vehiculo.findById(id);
    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.status(200).json(vehiculo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el vehículo' });
  }
};

const updateVehiculoById = async (req, res) => {
  const { id } = req.params;
  const { marca, modelo, transmision, kilometraje, precioDia, disponible, pasajeros } = req.body;
  const file = req.file;

  try {
    const updateData = {
      marca,
      modelo,
      transmision,
      kilometraje,
      precioDia,
      disponible,
      pasajeros
    };

    if (file) {
      const uploadedFile = await uploadFile(file, file.mimetype);
      updateData.file = uploadedFile.id;
    }

    const updatedVehiculo = await Vehiculo.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedVehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    res.status(200).json({ Status: 'Success', vehiculo: updatedVehiculo });
  } catch (error) {
    console.error('Error al actualizar el vehículo:', error);
    res.status(500).json({ error: 'Error al actualizar el vehículo' });
  }
};

const deleteVehiculoById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVehiculo = await Vehiculo.findByIdAndDelete(id);
    if (!deletedVehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.status(200).json({ message: 'Vehículo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el vehículo:', error);
    res.status(500).json({ error: 'Error al eliminar el vehículo' });
  }
};

module.exports = {
  createVehiculo,
  getAllVehiculos,
  getVehiculoById,
  updateVehiculoById,
  deleteVehiculoById,
};