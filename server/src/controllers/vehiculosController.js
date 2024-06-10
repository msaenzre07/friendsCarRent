const Vehiculo = require('../models/VehiculoModel');

// Crear un nuevo vehículo
const createVehiculo = async (req, res) => {
  try {
    const { marca, modelo, transmision, kilometraje, precioDia, disponible } = req.body;
    const file = req.file; // Acceder al archivo cargado

    // Verificar si se ha cargado un archivo
    if (!file) {
      return res.status(400).json({ Status: 'Error', error: 'Debes cargar una imagen para el vehículo' });
    }

    // Aquí puedes procesar el archivo según sea necesario
    // Por ejemplo, puedes guardar la ubicación del archivo en la base de datos
    const newVehiculo = new Vehiculo({
      marca,
      modelo,
      transmision,
      kilometraje,
      precioDia,
      file: file.filename, // Guardar el nombre del archivo en la base de datos
      disponible,
    });

    // Intenta guardar el vehículo
    await newVehiculo.save();

    // Si se guarda correctamente, envía una respuesta con estado 201 (creado) y el objeto del vehículo creado
    res.status(201).json({ Status: 'Success', vehiculo: newVehiculo });
  } catch (error) {
    // Si hay un error, envía una respuesta con estado 500 (error interno del servidor) y un mensaje de error
    console.error('Error al crear el vehículo:', error);
    res.status(500).json({ Status: 'Error', error: 'Error al crear el vehículo' });
  }
};

// Obtener todos los vehículos
const getAllVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los vehículos' });
  }
};

// Obtener un vehículo por ID
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

// Actualizar un vehículo por ID
const updateVehiculoById = async (req, res) => {
  const { _id } = req.params;
  const { marca, modelo, transmision, kilometraje, precioDia, disponible } = req.body;
  const file = req.file; // Acceder al archivo cargado si existe

  console.log(marca, modelo, transmision, kilometraje, precioDia, file, disponible);

  try {
    const updateData = {
      marca,
      modelo,
      transmision,
      kilometraje,
      precioDia,
      disponible,
    };

    if (file) {
      updateData.file = file.filename; // Actualizar solo si hay un nuevo archivo
    }

    const updatedVehiculo = await Vehiculo.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );

    if (!updatedVehiculo) {
      console.log("Vehículo no encontrado:", _id);
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    console.log("Vehículo actualizado:", updatedVehiculo);
    res.status(200).json({ Status: 'Success', vehiculo: updatedVehiculo });
  } catch (error) {
    console.error('Error al actualizar el vehículo:', error);
    res.status(500).json({ error: 'Error al actualizar el vehículo' });
  }
};

// Eliminar un vehículo por ID
const deleteVehiculoById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVehiculo = await Vehiculo.findByIdAndDelete(id);
    if (!deletedVehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.status(200).json({ message: 'Vehículo eliminado exitosamente' });
  } catch (error) {
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
