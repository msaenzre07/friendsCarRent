import React, { useState } from "react";
import {  FormGroup } from "reactstrap";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/reservar.css";

import "bootstrap/dist/css/bootstrap.min.css";

const Reservar = () => {
  // Estado para almacenar los valores de los campos del formulario
  const [formData, setFormData] = useState({
    nombreCliente: "",
    cantidadDias: "",
    lastName: "",
    fechaInicial: "",
    fechaFinal: "",
    fechaDevolucion: "",
    hora: "",
    lugar: "",
  });

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    // Pendientes acciones enviar los datos al  servidor
    console.log(formData);
  };

  return (
    <Helmet title="">
      <CommonSection title="Información de Reserva" />
      <section className="background-section">
        <Container>
          <Row className="justify-content-center">
            <section className="h-100 h-custom gradient-custom-2" >
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-11">
                    <div
                      className="card card-registration card-registration-2"
                      style={{ borderRadius: "15px", maxWidth: "1500px", margin: "0 auto" }}
                    >
                      <div className="card-body p-0">
                        <div className="row g-0">
                          <div className="col-lg-6">
                            <div className="p-5">
                              <h5
                                className="mb-4 fw-bold"
                                style={{ color: "#000d6b",marginLeft: '30px'}}
                              >
                                Formulario Reservación de Vehículos
                              </h5>

                              <FormGroup className="booking__form d-inline-block me-4 mb-4" style={{ marginLeft: '30px'}}>
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Nombre completo:
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    placeholder=""
                                    id="NombreCliente"
                                    name="NombreCliente"
                                    value={formData.nombreCliente}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </FormGroup>

                              <div>
                                <FormGroup className="booking__form d-inline-block me-4 mb-4" style={{ marginLeft: '30px'}}>
                                  <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label"
                                  >
                                    Cantidad de días del alquiler del auto:
                                  </label>
                                  <input
                                    type="number"
                                    id="cantidadDias"
                                    placeholder=""
                                    name="CantidadDias"
                                    min="1"
                                    value={formData.cantidadDias}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </FormGroup>
                              </div>

                              <div>
                                <FormGroup className="booking__form d-inline-block me-4 mb-4" style={{ marginLeft: '30px'}}>
                                  <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label"
                                  >
                                    Fecha inicial de la reservación:
                                  </label>
                                  <input
                                    type="date"
                                    placeholder=""
                                    name="Fecha Inicial"
                                    value={formData.fechaInicial}
                                    onChange={handleInputChange}
                                    required
                                    min={new Date().toISOString().split('T')[0]} // Establece el mínimo como la fecha actual
                               
                                  />
                                </FormGroup>
                              </div>

                              <FormGroup className="booking__form d-inline-block me-4 mb-4"style={{ marginLeft: '30px'}}>
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Fecha final de la reservación:
                                </label>
                                <div>
                                  <input
                                    type="date"
                                    placeholder=""
                                    name="Fecha Final"
                                    value={formData.fechaFinal}
                                    onChange={handleInputChange}
                                    required
                                    min={formData.fechaInicial} // Establece el mínimo como la fecha inicial
                                  />
                                </div>
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
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                  style={{ color: "#fff" }}
                                >
                                  Fecha de Entrega:
                                </label>
                                <input
                                  type="date"
                                  placeholder=""
                                  name="Fecha Devolución"
                                  value={formData.fechaDevolucion}
                                  onChange={handleInputChange}
                                  required
                                  min={formData.fechaInicial} // Establece el mínimo como la fecha inicial
                                />
                              </FormGroup>

                              <div className="devolver">
                                <FormGroup className="booking__form d-inline-block ms-1 mb-2">
                                  <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label"
                                    style={{ color: "#fff" }}
                                  >
                                    Hora de Entrega:
                                  </label>
                                  <input
                                    type="time"
                                    className="hora"
                                    value="11:45:00"
                                    max="22:30:00"
                                    min="10:00:00"
                                    step="1"
                                    name="Fecha"
                                  />
                                </FormGroup>
                              </div>

                              <div className="devolver">
                                <FormGroup className="booking__form d-inline-block me-4 mb-4">
                                  <div>
                                    <label
                                      htmlFor="d-flex align-items-center gap-2"
                                      className="form-label"
                                      style={{ color: "#fff" }}
                                    >
                                      Lugar de Entrega:
                                    </label>
                                    <input
                                      type="text"
                                      id="Lugar"
                                      placeholder=""
                                      name="Lugar"
                                      value={formData.lugar}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                </FormGroup>
                              </div>
                              <div
                                className=" d-flex align-items-center gap-2"
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
                              <div className="devolver text-center mt-5">
                                <button
                                  type="button"
                                  onClick={handleSubmit}
                                  className="btn btn-light btn-lg"
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
