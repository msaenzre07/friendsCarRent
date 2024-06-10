import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import axios from "axios";



const CarDetails = () => {
  const { slug } = useParams();
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    axios.get(`/api/vehiculos/${slug}`)
      .then(response => {
        setVehiculo(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el vehículo:', error);
      });
  }, [slug]);

  if (!vehiculo) {
    return <div>Cargando...</div>;
  }

  return (
    <Helmet title={vehiculo.marca}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={vehiculo.imgUrl} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{vehiculo.marca}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${vehiculo.precioDia}.00 / Día
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    ({vehiculo.ranking} rankings)
                  </span>
                </div>

                <p className="section__description">
                  {vehiculo.description}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehiculo.modelo}
                  </span>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-team-fill" style={{ color: "#f9a826" }}></i>{" "}
                    {vehiculo.pasajeros}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
