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
        setVehiculos(response.data.filter(vehiculo => vehiculo.disponible)); // Filtrar solo los vehículos con disponibilidad true
      })
      .catch(error => {
        console.error('Error al obtener los vehículos:', error);
      });
  }, []);

  return (
    <Helmet title="Nuestros Vehículos">
      <CommonSection title="Nuestros Vehículos de Alquiler" />
      <section>
        <Container>
          <Row>
            {vehiculos.map((vehiculo) => (
              <CarItem
                key={vehiculo._id}
                id={vehiculo._id}
                imgUrl={vehiculo.file} // Asegúrate de usar imagenUrl aquí
                marca={vehiculo.marca}
                modelo={vehiculo.modelo}
                precio={vehiculo.precioDia}
                pasajeros={vehiculo.pasajeros}
              />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
