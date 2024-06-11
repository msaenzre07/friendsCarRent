const Vehiculo = require('../models/VehiculoModel');

const upload = require('../middleware/upload');


const createVehiculo = async (req, res) => {
  try {
    const { marca, modelo, transmision, kilometraje, precioDia, disponible, pasajeros } = req.body;
    const file = req.file ? req.file.filename : null; // Obtener el nombre del archivo si existe

    if (!file) {
      return res.status(400).json({ status: 'Error', message: 'El archivo es obligatorio' });
    }

    const newVehiculo = new Vehiculo({
      marca,
      modelo,
      transmision,
      kilometraje,
      precioDia,
      disponible,
      file,
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
    
    // Mapear los vehículos para incluir la URL de la imagen
    const vehiculosConImagen = vehiculos.map(vehiculo => ({
      ...vehiculo.toObject(),
      º: `http://localhost:3000/uploads/${vehiculo.file}`

    }));

    res.status(200).json(vehiculosConImagen);
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
  console.log("ID recibido en el backend:", id);
  console.log("Datos recibidos en el cuerpo de la solicitud:", req.body);

  try {
    const updatedVehiculo = await Vehiculo.findByIdAndUpdate(
      id,
      { $set: req.body },
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
const devolverVehiculo = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el vehículo por ID
    const vehiculo = await Vehiculo.findById(id);
    
    // Si el vehículo no existe, devolver un error
    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    // Activar la disponibilidad del vehículo
    vehiculo.disponible = true;

    // Guardar los cambios en la base de datos
    await vehiculo.save();

    // Responder con un mensaje de éxito
    res.status(200).json({ message: 'Vehículo devuelto exitosamente' });
  } catch (error) {
    // Manejar cualquier error
    console.error('Error al devolver el vehículo:', error);
    res.status(500).json({ error: 'Error al devolver el vehículo' });
  }
};

module.exports = {
  createVehiculo,
  getAllVehiculos,
  getVehiculoById,
  updateVehiculoById,
  deleteVehiculoById,
  devolverVehiculo
};
