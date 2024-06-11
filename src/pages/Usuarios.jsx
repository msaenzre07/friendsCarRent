import React, { useState } from 'react';
import axios from "axios";
import { Container, Row, Form } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/usuarios.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

const DatosUsuarios = () => {
  // Variables de estado para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [tipoIdentificacion, setTipoIdentificacion] = useState("Cédula Nacional");
  const [numCedula, setNumCedula] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");

  // Función para agregar datos de usuarios
  const addUsuarios = () => {
    axios.post("http://localhost:3001/api/createUser", {
      nombre: nombre,
      tipoIdentificacion: tipoIdentificacion,
      numCedula: numCedula,
      edad: edad,
      correo: correo,
    })
    .then(() => {
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: "<i>La información <strong> " + nombre + " </strong>fue registrada con exito!!!</i>",
        icon: "success",
        timer: 3000,
      });
    }).catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response ? error.response.data.message : "Intente más tarde",
      });
    });
  };

  return (
    <Helmet title="">
      <CommonSection title="Detalles de Usuarios" />
      <section className="background-section">
        <Container>
          <Row className="justify-content-center">
            <div className="col-md-8 p-5 ">
              <h2>Digite la información solicitada</h2>
              <Form className="row g-3 detalleForm mt-4" onSubmit={(e) => { e.preventDefault(); addUsuarios(); }}>
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">Nombre completo:</label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="tipoIdentificacion" className="form-label">Tipo de identificación:</label>
                  <select
                    id="tipoIdentificacion"
                    value={tipoIdentificacion}
                    onChange={(event) => setTipoIdentificacion(event.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="Cédula Nacional">Cédula Nacional</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="numCedula" className="form-label">Número de cédula o pasaporte:</label>
                  <input
                    type="text"
                    id="numCedula"
                    value={numCedula}
                    onChange={(event) => setNumCedula(event.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="edad" className="form-label">Edad:</label>
                  <input
                    type="number"
                    id="edad"
                    value={edad}
                    onChange={(event) => setEdad(event.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="correo" className="form-label">Correo electrónico:</label>
                  <input
                    type="email"
                    id="correo"
                    value={correo}
                    onChange={(event) => setCorreo(event.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="titulo-imagen">
                  <div className="car-titulo">
                    Adjuntar foto de la "Licencia de conducir", "Cédula de Identidad" o "Pasaporte":
                  </div>
                  <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFile02" />
                    <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                  </div>
                </div>
                <div className="mb-3" style={{ textAlign: 'center' }}>
                  <button type="submit" className="btn btn-primary mt-3" style={{ fontSize: '1.1em', padding: '8px 16px' }}>Enviar</button>
                </div>
              </Form>
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default DatosUsuarios;
