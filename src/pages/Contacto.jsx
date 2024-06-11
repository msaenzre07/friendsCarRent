import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { Container, Row, Col, form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import swal from "sweetalert";

import "../styles/contact.css";

export const Contacto = () => {
  const form = useRef();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!userName.trim()) {
      errors.userName = "Nombre completo es requerido";
    }
    if (!userEmail.trim()) {
      errors.userEmail = "Correo Electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      errors.userEmail = "Correo Electrónico no es válido";
    }
    if (!message.trim()) {
      errors.message = "Mensaje es requerido";
    }
    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    emailjs
      .sendForm("service_m3ijpps", "template_edympzq", form.current, {
        publicKey: "3MmvgeCLgbq6ZYE1A",
      })
      .then(
        () => {
          swal("Éxito!", "Su mensaje ha sido enviado exitosamente!", "success");
          form.current.reset(); // Limpiar los campos del formulario
          setUserName("");
          setUserEmail("");
          setMessage("");
          setErrors({});
        },
        (error) => {
          swal(
            "Error!",
            "Error al enviar el mensaje, intente más tarde",
            "error"
          );
        }
      );
  };

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

              <form ref={form} onSubmit={sendEmail}>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Nombre completo"
                    type="text"
                    name="user_name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {errors.userName && (
                    <p className="error" style={{ color: "#a80e4b" }}>
                      {errors.userName}
                    </p>
                  )}
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Correo Electrónico"
                    type="email"
                    name="user_email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  {errors.userEmail && (
                    <p className="error" style={{ color: "#a80e4b" }}>
                      {errors.userEmail}
                    </p>
                  )}
                </FormGroup>
                <FormGroup className="contact__form">
                  <div class="col-md-12 pe-6">
                    <textarea
                      rows="5"
                      placeholder="Mensaje"
                      className="textarea"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    {errors.message && (
                      <p className="error" style={{ color: "#a80e4b" }}>
                        {errors.message}
                      </p>
                    )}
                  </div>
                </FormGroup>

                <button className=" contact__btn" type="submit" value="Send">
                  Enviar
                </button>
              </form>
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
                    friendsCarRent2024@outlook.com
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
