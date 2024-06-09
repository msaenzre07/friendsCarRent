const User = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


const register = async (req, res) => {
    const { nombreCompleto, email, password, archivoLicencia } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya fue registrado' });
        }

        const newUser = new User({
            nombreCompleto,
            email,
            password,
            phone: "00000000",
            nacionalidad: "CostaRica",
            tipoIdentificacion: "Cedula",
            cedula: "200000000",
            fechanacimiento: new Date("2000-06-24"),
            archivoLicencia: archivoLicencia || "n/a",
            rol: 'user',
            estado: 'activo'
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Usuario registrado correctamente', userId: savedUser._id });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' });
      }

      // Aquí podrías devolver algún tipo de identificador de sesión o token de sesión si es necesario

      res.status(200).json({ message: 'Inicio de sesión exitoso', username: user.nombreCompleto });
      console.log(user.nombreCompleto);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  // Verificar que el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de usuario no válido' });
  }

  const { phone, nacionalidad, tipoIdentificacion, cedula, fechanacimiento } = req.body;

  if (!phone || !nacionalidad || !tipoIdentificacion || !cedula || !fechanacimiento) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
      const updateData = {
          phone,
          nacionalidad,
          tipoIdentificacion,
          cedula,
          fechanacimiento: new Date(fechanacimiento),
      };

      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario actualizado correctamente', user: updatedUser });
  } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los datos del usuario' });
    }
};

const logout = async (req, res) => {
  // Aquí deberías realizar cualquier acción necesaria para cerrar la sesión del usuario,
  // como invalidar tokens de sesión, eliminar cookies, etc.
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
};

module.exports = { register, login,logout, updateUser, getUserById };
