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
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/${vehiculo.file}`
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
      // Aquí puedes manejar la lógica para subir el archivo a donde quieras
      // Puedes utilizar librerías como aws-sdk para subir a Amazon S3, o simplemente guardar en tu servidor
      // Aquí te muestro un ejemplo de cómo podrías hacerlo con multer, pero depende de tu configuración y necesidades
      // const uploadedFile = await uploadFile(file, file.mimetype);
      // updateData.file = uploadedFile.id;
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
