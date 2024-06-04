import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Form, Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import Swal from "sweetalert2";
import "../styles/usuarios.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DatosUsuarios = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nacionalidad, setNacionalidad] = useState("Cedula");
  const [tipoIdentificacion, setTipoIdentificacion] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechanacimiento, setFechaNacimiento] = useState("");
  const [archivoLicencia, setArchivoLicencia] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/usuarios/${id}`
        );
        const user = response.data;
        //setNombreCompleto(user.nombreCompleto);
        // setEmail(user.email);
        // setPhone(user.phone);
        setNacionalidad("");
        // setTipoIdentificacion(user.tipoIdentificacion);
        // setCedula(user.cedula);
        //setFechaNacimiento(user.fechanacimiento);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al cargar los datos del usuario",
        });
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      //formData.append('phone', phone);
      formData.append("nacionalidad", nacionalidad);
      formData.append("tipoIdentificacion", tipoIdentificacion);
      formData.append("cedula", cedula);
      formData.append("fechanacimiento", fechanacimiento);
      formData.append("archivoLicencia", archivoLicencia);

      const response = await axios.put(
        `http://localhost:3000/usuarios`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: "Usuario actualizado correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al actualizar el usuario",
      });
    }
  };

  return (
    <Helmet title="">
      <CommonSection title="Detalles de Usuarios" />
      <section className="background-section">
        <Container>
          <Row className="justify-content-center">
            <div className="col-md-8 p-5">
              <h2>Actualice la información solicitada</h2>
              <Form
                className="row g-3 detalleForm mt-4"
                onSubmit={handleSubmit}
              >
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    Teléfono:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="tipoIdentificacion" className="form-label">
                    Tipo de Identificación:
                  </label>
                  <select
                    id="tipoIdentificacion"
                    value={tipoIdentificacion}
                    onChange={(event) =>
                      setTipoIdentificacion(event.target.value)
                    }
                    className="form-control"
                  >
                    <option value="Cedula">Cédula</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="nacionalidad" className="form-label">
                    Nacionalidad:
                  </label>
                  <input
                    type="text"
                    id="nacionalidad"
                    value={nacionalidad}
                    onChange={(event) => setNacionalidad(event.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="cedula" className="form-label">
                    Cédula:
                  </label>
                  <input
                    type="text"
                    id="cedula"
                    value={cedula}
                    onChange={(event) => setCedula(event.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="fechanacimiento" className="form-label">
                    Fecha de Nacimiento:
                  </label>
                  <input
                    type="date"
                    id="fechanacimiento"
                    value={fechanacimiento.split("T")[0]}
                    onChange={(event) => setFechaNacimiento(event.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="archivoLicencia" className="form-label">
                    Archivo de Licencia:
                  </label>
                  <input
                    type="file"
                    id="archivoLicencia"
                    onChange={(event) =>
                      setArchivoLicencia(event.target.files[0])
                    }
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                <div className="mb-3" style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    className="btn btn-primary mt-3"
                    style={{ fontSize: "1.1em", padding: "8px 16px" }}
                  >
                    Actualizar
                  </Button>
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
