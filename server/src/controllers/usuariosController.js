const User = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { nombreCompleto, email, password, archivoLicencia } = req.body; // Agregamos archivoLicencia

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya fue registrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      nombreCompleto,
      email,
      password: hashedPassword,
      phone: "00000000",
      nacionalidad: "CostaRica",
      tipoIdentificacion: "Cedula",
      cedula: "200000000",
      fechanacimiento: "2000-06-24T00:00:00.000+00:00",
      archivoLicencia  // Guardamos el nombre del archivo de licencia
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Usuario registrado correctamente', userId: savedUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
}

const updateUser = async (req, res) => {
  const { id, nombreCompleto, email, phone, nacionalidad, tipoIdentificacion, cedula, fechanacimiento, archivoLicencia } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    if (nombreCompleto) user.nombreCompleto = nombreCompleto;
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({ error: 'El correo electrónico ya fue registrado por otro usuario' });
      }
      user.email = email;
    }
    if (phone) user.phone = phone;
    if (nacionalidad) user.nacionalidad = nacionalidad;
    if (tipoIdentificacion) user.tipoIdentificacion = tipoIdentificacion;
    if (cedula) user.cedula = cedula;
    if (fechanacimiento) user.fechanacimiento = fechanacimiento;
    if (archivoLicencia) user.archivoLicencia = archivoLicencia; // Actualizamos el campo de la licencia

    await user.save();
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
}

module.exports = { register, updateUser, getUserById };
