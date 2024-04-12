import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";

import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";

const About = () => {
    return (
        <Helmet title="About">
        <CommonSection title="Acerca de Nosotros" />
        <AboutSection aboutclassName="aboutPage" />

        <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
             
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content" > 
                <h2 className="section__title">
                  Con nuestros autos, cada kilómetro recorrido es una experiencia inigualable.
                </h2>

                <p className="section__description">
                  Visítanos y descubre por qué somos la mejor opción para alquilar autos. Con nuestros vehículos, no hay límites paras tus aventuras.
                </p>
                
                <p className="section__description" > 
                  Estamos comprometidos con tu satisfacción, por eso te ofrecemos los mejores autos. ¡No espere más! Ven y conoce nuestros autos, te sorprenderán.
                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i className="ri-whatsapp-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Comunícate con Nosotros</h6>
                    <h4>506 84797554</h4>
                    </div>
                </div>
              </div>
            </Col>
            </Row>
            </Container>
        </section>
        
        <BecomeDriverSection />

        <section>
        <Container>
            <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Expertos</h6>
              <h2 className="section__title">Nuestros Miembros</h2>
            </Col>
            <OurMembers />
            </Row>
        </Container>
      </section>
    </Helmet>
    );
};

export default About;