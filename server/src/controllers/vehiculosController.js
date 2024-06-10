const Vehiculo = require('../models/VehiculoModel');
const { uploadFile } = require('../../googleDriveService');
const upload = require('../middleware/upload.js');

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
    const vehiculos = await Vehiculo.find();
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
