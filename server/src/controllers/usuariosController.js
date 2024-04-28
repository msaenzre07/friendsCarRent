import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const db = require("../database/database.js");

router.post("/registro", async (req, res) => {
  try {
    const { nombre, correo, contrasena, repetirContrasena } = req.body;

    const sql =
      "INSERT INTO create (nombre, correo, contrasena, repetirContrasena) VALUES (?, ?, ?, ?)";
    await db.query(sql, [nombre, correo, contrasena, repetirContrasena]);
    res.status(200).json({ message: "Registro exitoso" });
  } catch (err) {
    console.error("Error al registrarse: ", err);
    res.status(500).json({ message: "Error al registrarse", error: err });
  }
});

//Pendiente código del Login

module.exports = router;