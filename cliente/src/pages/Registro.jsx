import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";
import { Container, Row, Form, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import registroImg from "../assets/all-images/registro.jpg";

const Registro = () => {
  const [nombre, setNombre] = useState();
  const [correo, setCorreo] = useState();
  const [contrasena, setContrasena] = useState();
  const [repetirContrasena, setRepetirContrasena] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/registro", {
        nombre,
        correo,
        contrasena,
        repetirContrasena
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Helmet title="">
      <CommonSection title="Registro de Usuarios" />
      <section className="body-login">
        <Container>
          <Row>
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                  <div
                    className="card text-black"
                    style={{ borderRadius: "25px" }}
                  >
                    <div className="card-body p-md-4">
                      <div className="row justify-content-center ">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                          <p
                            className="text-center h5 fw-bold mb-3"
                            style={{ color: "#000d6b" }}
                          >
                            Regístrate
                          </p>
                          <Form onSubmit={handleSubmit}>
                            <div className="d-flex flex-row align-items-center mb-0">
                              <i
                                className="ri-user-fill"
                                style={{
                                  color: "#faa935",
                                  marginRight: "5px",
                                  marginBottom: "29px",
                                  marginTop: "0px",
                                  fontSize: "24px",
                                }}
                              ></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                onchange ={(event)=> setNombre(event.target.value)}
                                  type="text"
                                  id="nombre"
                                  className="form-control"
                                  placeholder="Nombre completo"
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1c"
                                ></label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-start mb-10">
                              <i
                                className="ri-mail-check-fill"
                                style={{
                                  color: "#faa935",
                                  marginRight: "5px",
                                  marginBottom: "29px",
                                  marginTop: "6px",
                                  fontSize: "24px",
                                }}
                              ></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  onchange={(event) =>
                                    setCorreo(event.target.value)
                                  }
                                  type="email"
                                  id="email"
                                  className="form-control"
                                  placeholder="Correo electrónico"
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1c"
                                ></label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-0">
                              <i
                                className=" ri-lock-fill"
                                style={{
                                  color: "#faa935",
                                  marginRight: "5px",
                                  marginBottom: "29px",
                                  marginTop: "6px",
                                  fontSize: "24px",
                                }}
                              ></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  onchange={(event) =>
                                    setContrasena(event.target.value)
                                  }
                                  type="password"
                                  id="pass1"
                                  className="form-control"
                                  placeholder="Contraseña"
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1c"
                                ></label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-0">
                              <i
                                className="ri-key-2-line"
                                style={{
                                  color: "#faa935",
                                  marginRight: "5px",
                                  marginBottom: "29px",
                                  marginTop: "6px",
                                  fontSize: "24px",
                                }}
                              ></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  onchange={(event) =>
                                    setRepetirContrasena(event.target.value)
                                  }
                                  type="password"
                                  id="pass2"
                                  className="form-control"
                                  placeholder="Confirmar contraseña"
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1c"
                                ></label>
                              </div>
                            </div>

                            <div className="form-check d-flex justify-content-start align-items-center mb-1">
                              <label
                                className="form-check-label"
                                for="form2Example3"
                              >
                                Al registrarte, aceptas nuestras Condiciones de
                                uso de Política de privacidad.
                                <a href="#!"></a>
                              </label>
                            </div>

                            <div className="my-4"></div>
                            <div
                              className="d-flex justify-content-center mx-4 mb-3 mb-lg-5"
                              style={{ padding: "5px 10px" }}
                            >
                              <Button
                                type="submit"
                                className="btn secondary_btn bubbly_button"
                              >
                                Registrate
                              </Button>
                            </div>
                          </Form>
                          <p>
                            ¿Ya tienes una cuenta?
                            <Link to="/login">Iniciar sesión</Link>
                          </p>
                        </div>
                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                          <img
                            src={registroImg}
                            className="img-fluid"
                            alt="Sample image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <script src="../JS/Registro.js"></script>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Registro;
