import React, { useState, useEffect } from 'react';
import { useParams,Link, useNavigate  } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Form, Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import Swal from 'sweetalert2';
import "../styles/usuarios.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const DatosUsuarios = () => {
  const { id } = useParams();
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [tipoIdentificacion, setTipoIdentificacion] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechanacimiento, setFechaNacimiento] = useState(new Date());
  const [archivoLicencia, setArchivoLicencia] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
        const user = response.data;
        setNombreCompleto(user.nombreCompleto);
        setEmail(user.email);
        setPhone(user.phone);
        setNacionalidad(user.nacionalidad);
        setTipoIdentificacion(user.tipoIdentificacion);
        setCedula(user.cedula);
        setFechaNacimiento(new Date(user.fechanacimiento));
        setArchivoLicencia(user.archivoLicencia);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar los datos del usuario',
        });
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = {
            phone,
            nacionalidad,
            tipoIdentificacion,
            cedula,
            fechanacimiento: fechanacimiento.toISOString(),
        };

        const response = await axios.put(`http://localhost:3000/usuarios/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            Swal.fire({
                title: "<strong>Actualización exitosa</strong>",
                text: `El usuario fue actualizado con éxito`,
                icon: "success",
                timer: 3000,
            });
            navigate(`/login`);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al actualizar el usuario. Inténtalo de nuevo más tarde.",
            });
        }
    } catch (error) {
        let errorMessage = "Inténtalo de nuevo más tarde";
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
        } else if (error.message) {
            errorMessage = error.message;
        }
        console.error(errorMessage);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
        });
    }
};


  const handleDateChange = (date) => {
    setFechaNacimiento(date);
  };

  return (
    <Helmet title="Detalles de Usuarios">
      <CommonSection title="Detalles de Usuarios" />
      <section className="background-section">
        <Container>
          <Row className="justify-content-center">
            <div className="col-md-8 p-5">
              <h2>Actualice la información solicitada</h2>
              <Form className="row g-3 detalleForm mt-4" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label className="form-label">Teléfono:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="tipoIdentificacion" className="form-label">Tipo de Identificación:</label>
                  <select
                    id="tipoIdentificacion"
                    value={tipoIdentificacion}
                    onChange={(event) => setTipoIdentificacion(event.target.value)}
                    className="form-control"
                  >
                    <option value="Cedula">Cédula</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="nacionalidad" className="form-label">Nacionalidad:</label>
                  <input
                    type="text"
                    id="nacionalidad"
                    value={nacionalidad}
                    onChange={(event) => setNacionalidad(event.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="cedula" className="form-label">Cédula:</label>
                  <input
                    type="text"
                    id="cedula"
                    value={cedula}
                    onChange={(event) => setCedula(event.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="fechanacimiento" className="form-label">Fecha de Nacimiento:</label>
                  <DatePicker
                    id="fechanacimiento"
                    selected={fechanacimiento}
                    onChange={handleDateChange}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="archivoLicencia" className="form-label">Archivo de Licencia:</label>
                  <input
                    type="file"
                    id="archivoLicencia"
                    onChange={(event) => setArchivoLicencia(event.target.files[0])}
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                <div className="mb-3" style={{ textAlign: 'center' }}>
                  <Button type="submit" className="btn btn-primary mt-3" style={{ fontSize: '1.1em', padding: '8px 16px' }}>Actualizar</Button>
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
