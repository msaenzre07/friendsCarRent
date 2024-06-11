import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItemDevo";
import axios from "axios";

const DevolucionVehiculo = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/vehiculos")
      .then(response => {
        // Filtrar solo los vehículos con disponibilidad true
        const vehiculosDisponibles = response.data.filter(vehiculo => !vehiculo.disponible);
        setVehiculos(vehiculosDisponibles);
      })
      .catch(error => {
        console.error('Error al obtener los vehículos:', error);
      });
  }, []);

  return (
    <Helmet title="Vehículos Reservados">
      <CommonSection title="Vehiculos Reservados" />
      <section>
        <Container>
          <Row>
            {vehiculos.map((vehiculo) => (
              <CarItem
                key={vehiculo._id}
                id={vehiculo._id}
                imgUrl={vehiculo.imageUrl} // Asegúrate de usar imageUrl aquí
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

export default DevolucionVehiculo;
