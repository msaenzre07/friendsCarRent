import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Contacto from "../pages/Contacto";
import Vehiculos from "../pages/Vehiculos";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import DatosUsuarios from "../pages/Usuarios";
import Reservar from "../pages/Reservar";
import Perfil from "../pages/Perfil";
import Editar from "../pages/EditarPerfil";
import Historial from "../pages/Historial";

import Reportes from "../pages/MostReservedVehiclesReport";
import DevolucionesVehiculo from "../pages/DevolucionVehiculo";



const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route path="/about" element={<About />} />
            <Route path="/cars" element={<CarListing />} />
            <Route path="/cars/:slug" element={<CarDetails />} />
            <Route path="/datosUsuarios/:id" element={<DatosUsuarios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/reservar/:id" element={<Reservar />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfilEditar" element={<Editar />} />
            <Route path="/Historial" element={<Historial />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/devolucionesVehiculo"element={<DevolucionesVehiculo />} />

        </Routes>
    );
};

export default Routers;
