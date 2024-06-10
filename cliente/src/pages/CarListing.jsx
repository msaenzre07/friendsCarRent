import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import axios from "axios";



const CarListing = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/vehiculos")
      .then(response => {
        setVehiculos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los vehículos:', error);
      });
  }, []);

  return (
    <Helmet title="Reservar">
      <CommonSection title="Nuestros Vehículos de Alquiler" />
      <section>
        <Container>
          <Row>
          {vehiculos.map((vehiculo) => (
  <CarItem vehiculo={vehiculo} key={vehiculo._id} />
))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
