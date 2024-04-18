import express from "express";
import cors from "cors";
const jwt = require('jsonwebtoken');
import cookieParser from "cookie-parser";
const db = require("../models/database.js");

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


router.post("/login", (req, res) => {
 
const { correo, contrasena } = req.body;
models.database.findOne({correo})
    
.then(usuario => {
    if(usuario) {
        if(usuario.contrasena === contrasena){
            
      const accessToken = jwt.sign({ correo: correo }, 
        "jwt-access-token-secret-key", { expiresIn: '1m' })
      const refreshToken = jwt.sign({ correo: correo },
         "jwt-refresh-token-secret-key", { expiresIn: '5m' })

    res.cookie('accessToken', accessToken, {maxAge: 60000})

    res.cookie('refreshToken', refreshToken,
     {maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict'})
     return res.json({Login: true})

    }
      
    }else {
           
     res.json({Login: false, Message: "Credenciales incorrectas"})

    }
  }).catch (err => res.json( err));
 
  });

  const verificarUsuarios = (req, res, next)=>{
    const accesstoken = req.cookies.accessToken;
    if(!accesstoken){
      if(renewToken(req, res)){
        next()
      }

    }else{
      jwt.verify(accesstoken,'jwt-access-token-secret-key', (err, decoded)=>{
     
        if(err){
          return res.json({valid: false, message: "Token Inválido"})
        }else{
          req.correo = decoded.correo
          next()
        }
      })
    }
  }

  const renewToken = (req, res) =>{
    const refreshtoken = req.cookies.refreshToken;
    let exist = false;
    if(!refreshtoken){
      return res.json({valid:false, message: "Sin token de actualización"})

    }else{
      jwt.verify(refreshtoken,'jwt-refresh-token-secret-key', (err, decoded)=>{
     
        if(err){
          return res.json({valid: false, message: "Token de actualización no válido"})
        }else{
          const accessToken = jwt.sign({ correo: decoded.correo }, 
            "jwt-access-token-secret-key", { expiresIn: '1m' })
            res.cookie('accessToken', accessToken, {maxAge: 60000})
          exist = true;
          }
      })
    }
    return exist;

  }

  app.get('/dashboard', verificarUsuarios,( req, res) => {
return res.json({valid: true, message: "autorizado"})

  })


   
    
   

    
    



module.exports = router;