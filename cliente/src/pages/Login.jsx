import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Form, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";

import loginImg from "../assets/all-images/login.png";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        correo,
        contrasena
      })
      .then((res) => {
        if(res.data.Login){
          navigate("/dashboard")

        }else{
          navigate('/')
        }
        
      })
      .catch((err) => console.log(err));
  };
 

  return (
    <Helmet title="">
      <CommonSection title="Iniciar Sesión" />
      <section className="body-login">
        <Container>
          <Row>
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-9">
                  <div
                    className="card text-black"
                    style={{ borderRadius: "25px" }}
                  >
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-0">
                          <p
                            className="text-center h5 fw-bold mb-4"
                            style={{ color: "#000d6b" }}
                          >
                            IniciarSesión
                          </p>

                          <Form onSubmit={handleSubmit}>
                            <div className="d-flex flex-row align-items-center mb-0">
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
                                  value={correo}
                                  onChange={(event) =>
                                    setCorreo(event.target.value)
                                  }
                                  placeholder="Correo Electrónico"
                                  type="correo"
                                  id="correo"
                                  className="form-control"
                                  required={true}
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
                                  value={contrasena}
                                  onChange={(event) =>
                                    setContrasena(event.target.value)
                                  }
                                  placeholder="Contraseña"
                                  type="contrasena"
                                  id="contrasena"
                                  className="form-control"
                                  required={true}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1c"
                                ></label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-start mb-2">
                              <i
                                className="ri-admin-line"
                                style={{
                                  color: "#faa935",
                                  marginRight: "5px",
                                  marginBottom: "29px",
                                  marginTop: "0px",
                                  fontSize: "24px",
                                }}
                              ></i>
                              <div className="form-outline flex-fill mb-0">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>Tipo de Usuario</option>
                                  <option value="1">Administrador</option>
                                  <option value="2">Cliente</option>
                                </select>
                              </div>
                            </div>
                            <div
                              className="d-flex justify-content-center mx-4 mb-3 mb-lg-5"
                              style={{ padding: "5px 10px" }}
                            >
                              <Button
                                className="btn secondary_btn auth_btn"
                                type="submit"
                               
                              >
                                Iniciar Sesión
                              </Button>
                            </div>
                          </Form>

                          <div className="links">
                            <a href="#!">Olvidó la Contraseña?</a>
                            <p>
                              ¿No tiene una cuenta?
                              <Link to="/registro">Registrate</Link>
                            </p>
                          </div>

                          <div className="text-center mt-2">
                            <p>
                              Todos los derechos reservados &copy; copyright
                              2024
                            </p>
                          </div>
                        </div>

                        <div className="col-md-10 col-lg-6 col-xl-6 d-flex align-items-center order-1 order-lg-2">
                          <img
                            src={loginImg}
                            className="img-fluid mt-3 mt-lg-0 me-lg-3"
                            alt="Sample image"
                            style={{ maxWidth: "400px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Login;
