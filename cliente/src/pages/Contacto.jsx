import React from "react";

import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";

const Contacto = () => {
  return (
    <Helmet title="Contact">
      <CommonSection title="Contactános Ahora" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h2 className="section__title">
                Formulario para envío de consulta
              </h2>
              <p className="section__description">
                Alquilar un auto puede ser estresante y te entendemos
                perfectamente. ¡No dudes en comunicarte con nosostros!
                Prepararemos tu auto de alquiler.
              </p>

              <Form>
                <FormGroup className="contact__form">
                  <Input placeholder="Nombre completo" type="text" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Correo electrónico" type="email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <div class="col-md-12 pe-6">
                    <textarea
                      rows="5"
                      placeholder="Mensaje"
                      className="textarea"
                    ></textarea>
                  </div>
                </FormGroup>

                <button className=" contact__btn" type="submit">
                  Enviar
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h2 className="section__title">Contacta con nosotros</h2>

                <div className=" d-flex align-items-center gap-2">
                  <i
                    className="ri-road-map-line"
                    style={{ color: "#D2691E" }}
                  ></i>
                  Estamos ubicados en:
                  <p className="section__description mb-0">
                    Alajuela, San Carlos, Ciudad Quesada
                  </p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <i
                    className="ri-whatsapp-line"
                    style={{ color: "#D2691E" }}
                  ></i>{" "}
                  Telefóno:
                  <p className="section__description mb-0">+506 84797554</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <i
                    className="ri-mail-check-line"
                    style={{ color: "#D2691E" }}
                  ></i>
                  Correo Electrónico:
                  <p className="section__description mb-0">
                    {" "}
                    hernanvalerio7190@gmail.com
                  </p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <i className="ri-timer-line" style={{ color: "#D2691E" }}></i>
                  Atención al Cliente:
                  <p className="section__description mb-0">
                    {" "}
                    Lunes a Domingo de 09:00 a.m a 05:00 p.m.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contacto;
