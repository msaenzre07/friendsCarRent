import React from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Information from "../components/UI/Information";

import BlogList from "../components/UI/BlogList";

const Home = () => {
    return (
        <Helmet title="Home">  
          {/*--------hero section--------*/}
          <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
          <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left  ">
                  <h2 className="textoAnimado">No espere más ¡Visítanos!</h2>
                </div>
              </Col>
              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
              </Row>   
          </Container>
        </div>
      </section>
      {/*--------about section-------*/}
      <AboutSection />
      {/*--------services section ----*/}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Viaje con confianza</h6>
              <h2 className="section__title">Te ofrecemos</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* ----- car offer section ------ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Vehículos de alquiler</h6>
              <h2 className="section__title">Descubre más opciones para tu viaje</h2>
            </Col>

            {carData.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
        {/* ----- become a driver section ----- */}
        <BecomeDriverSection />

        {/* =========== information section =========== */}
        <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Información útil</h6>
              <h2 className="section__title">Al considerar alquilar un vehículo es importante tener en cuenta</h2>
            </Col>

            <Information />
          </Row>
        </Container>
      </section>
      
      {/*------- blog section ---------- */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">¿Quieres sentir el confort en cada viaje? </h6>
              <h2 className="section__title">Con nuestros autos, la aventura está a solo un volante de distancia</h2>
            </Col>

                 <BlogList />
                </Row>
            </Container>
            </section>
        </Helmet>
    );
};

export default Home;