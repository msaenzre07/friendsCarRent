import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/bmw-offer.jpg";

const AboutSection = ({ aboutclassName }) => {
  return (
    <section
      className="about__section"
      style={
        aboutclassName === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">¿Quiénes Somos?</h4>
              <h2 className="section__title">Friend's Car Rent</h2>
              <h2 className="section__title">Misión</h2>
              <p className="section__description" style={{ textAlign: "justify" }}>
              Friend's Car Rent es una agencia que se estableció en el 2024. Nació con la misión de proporcionar soluciones de 
              movilidad eficientes y confiables a nuestros clientes ofreciendo una flota diversificada de vehículos de alta calidad 
              y un servicio excepcional. Nos comprometemos a satisfacer las necesidades de transporte de nuestros clientes, 
              contribuyendo a experiencias de viajes seguros, cómodos y memorables. Nuestro objetivo es asegurar una respuesta 
              inmediata y mantener una retroalimentación constante y continua para mejorar nuestro servicio. Nos enorgullece poder 
              ofrecer un trato a amable y cercano a cada cliente, haciendo de su experiencia con nosotros algo extraordinario.
             </p>
              
             <h2 className="section__title">Visión</h2>
              <p className="section__description" style={{ textAlign: "justify" }}>
              Ser la agencia de renta de autos líder a nivel nacional, reconocida por la excelencia en el servicio al cliente, 
              la innovación en soluciones de movilidad y la sostenibilidad ambiental. Nos esforzamos por superar las expectativas 
              de nuestros clientes y ser pioneros en la adopción de tecnologías emergentes de esta manera mejorar la eficiencia 
              operativa y ofrecer experiencias de viajes fluidas. Aspiramos a ser un referente en la industria automotriz, 
              estableciendo estándares de calidad y compromiso social. 
              </p>
    
             <div className="about__section-content" >
              <h4 className="section__subtitle">Nuestros</h4>
              <h2 className="section__title">Valores</h2>
            </div>
             <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Compromiso.
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Integridad.
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Calidad.
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Eficiencia operativa.
                </p>
              </div>
            </div>
          </Col>
 
             <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
       </Container>
    </section>
  );   
};

export default AboutSection;