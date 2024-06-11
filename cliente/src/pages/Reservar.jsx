import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/reservar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from '../UserContext';


const Reservar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState({});
  const [formData, setFormData] = useState({
    cantidadDias: "",
    fechaInicial: "",
    fechaFinal: "",
    fechaDevolucion: "",
    hora: "",
    lugar: "",
  });

  useEffect(() => {
    if (!user.id) {
      navigate('/login');
    }

    // Obtener datos del vehículo
    const fetchVehiculo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/vehiculos/${id}`);
        const data = await response.json();
        setVehiculo(data);
      } catch (error) {
        console.error("Error al obtener los datos del vehículo", error);
      }
    };

    fetchVehiculo();
  }, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.id) {
      alert("Por favor, inicia sesión para realizar una reserva.");
      return;
    }

    const reservaData = {
      ...formData,
      id_vehiculo: id,
      id_usuario: user.id, // Usar el id del usuario del contexto
    };

    console.log("Enviando datos de reserva:", reservaData);

    try {
      const response = await fetch("http://localhost:3000/reservaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservaData),
      });
      navigate('/cars');

      if (response.ok) {
        console.log("Reserva creada con éxito");

        // Actualizar disponibilidad del vehículo
        const updateResponse = await fetch(`http://localhost:3000/vehiculos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ disponible: false }), // Actualizar a disponibilidad a false
        });
        
        if (updateResponse.ok) {
          console.log("Estado de disponibilidad del vehículo actualizado correctamente");
        } else {
          console.error("Error al actualizar el estado de disponibilidad del vehículo");
        }
      } else {
        const errorData = await response.json();
        console.error("Error al crear la reserva:", errorData);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de reserva", error);
    }
  };

  return (
    <Helmet title="Reservar">
      <CommonSection title="Información de Reserva" />
      <section className="background-section">
        <Container>
          <Row className="justify-content-center">
            <section className="h-100 h-custom gradient-custom-2">
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-11">
                    <div
                      className="card card-registration card-registration-2"
                      style={{
                        borderRadius: "15px",
                        maxWidth: "1500px",
                        margin: "0 auto",
                      }}
                    >
                      <div className="card-body p-0">
                        <div className="row g-0">
                          <div className="col-lg-6">
                            <div className="p-5">
                              <h5
                                className="mb-4 fw-bold"
                                style={{ color: "#000d6b", marginLeft: "30px" }}
                              >
                                Formulario Reservación de Vehículos
                              </h5>
                              <h6
                                className="mb-4"
                                style={{ color: "#000d6b", marginLeft: "30px" }}
                              >
                                Vehículo: {vehiculo.marca} {vehiculo.modelo}
                              </h6>
                              <FormGroup
                                className="booking__form d-inline-block me-4 mb-4"
                                style={{ marginLeft: "30px" }}
                              >
                                <label
                                  htmlFor="cantidadDias"
                                  className="form-label"
                                >
                                  Cantidad de días del alquiler del auto:
                                </label>
                                <input
                                  type="number"
                                  id="cantidadDias"
                                  name="cantidadDias"
                                  min="1"
                                  value={formData.cantidadDias}
                                  onChange={handleInputChange}
                                  required
                                />
                              </FormGroup>

                              <FormGroup
                                className="booking__form d-inline-block me-4 mb-4"
                                style={{ marginLeft: "30px" }}
                              >
                                <label
                                  htmlFor="fechaInicial"
                                  className="form-label"
                                >
                                  Fecha inicial de la reservación:
                                </label>
                                <input
                                  type="date"
                                  id="fechaInicial"
                                  name="fechaInicial"
                                  value={formData.fechaInicial}
                                  onChange={handleInputChange}
                                  required
                                  min={new Date().toISOString().split("T")[0]}
                                />
                              </FormGroup>

                              <FormGroup
                                className="booking__form d-inline-block me-4 mb-4"
                                style={{ marginLeft: "30px" }}
                              >
                                <label
                                  htmlFor="fechaFinal"
                                  className="form-label"
                                >
                                  Fecha final de la reservación:
                                </label>
                                <input
                                  type="date"
                                  id="fechaFinal"
                                  name="fechaFinal"
                                  value={formData.fechaFinal}
                                  onChange={handleInputChange}
                                  required
                                  min={formData.fechaInicial}
                                />
                              </FormGroup>
                            </div>
                          </div>
                          <div className="col-lg-6 bg-indigo text-white">
                            <div className="p-5">
                              <h5 className="mb-4 fw-bold">
                                Formulario Devolución de Vehículos
                              </h5>

                              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                                <label
                                  htmlFor="fechaDevolucion"
                                  className="form-label"
                                  style={{ color: "#fff" }}
                                >
                                  Fecha de Entrega:
                                </label>
                                <input
                                  type="date"
                                  id="fechaDevolucion"
                                  name="fechaDevolucion"
                                  value={formData.fechaDevolucion}
                                  onChange={handleInputChange}
                                  required
                                  min={formData.fechaInicial}
                                />
                              </FormGroup>

                              <FormGroup className="booking__form d-inline-block ms-1 mb-2">
                                <label
                                  htmlFor="hora"
                                  className="form-label"
                                  style={{ color: "#fff" }}
                                >
                                  Hora de Entrega:
                                </label>
                                <input
                                  type="time"
                                  id="hora"
                                  name="hora"
                                  value={formData.hora}
                                  onChange={handleInputChange}
                                  required
                                />
                              </FormGroup>

                              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                                <label
                                  htmlFor="lugar"
                                  className="form-label"
                                  style={{ color: "#fff" }}
                                >
                                  Lugar de Entrega:
                                </label>
                                <input
                                  type="text"
                                  id="lugar"
                                  name="lugar"
                                  value={formData.lugar}
                                  onChange={handleInputChange}
                                  required
                                />
                              </FormGroup>

                              <div
                                className="d-flex align-items-center gap-2"
                                style={{ color: "#fff" }}
                              >
                                <span>
                                  <i
                                    className="ri-alarm-warning-fill"
                                    style={{ color: "#faa935" }}
                                  ></i>
                                  Atención: En caso que devuelva el vehículo en
                                  otro sitio y fecha diferente deberá pagar un
                                  adicional de $66.
                                </span>
                              </div>

                              <div className="text-center mt-5">
                                <button
                                  type="submit"
                                  onClick={handleSubmit}
                                  className="btn btn-light btn-lg reservar-btn"
                                  style={{ color: "#fff" }}
                                >
                                  Reservar Ahora
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Reservar;
