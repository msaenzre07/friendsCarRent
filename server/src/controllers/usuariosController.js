const User = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');


const { register} = require("./vehiculosController");


require('dotenv').config();

const register = async (req, res) => {
  const { nombreCompleto, email, password } = req.body;

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
          cedula: "200000000",
          fechanacimiento: "2000-06-24T00:00:00.000+00:00"

      });
      await newUser.save();
      res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar el usuario' });
  }
}
module.exports = { register};
