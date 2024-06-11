import React from "react";
import { Col } from "reactstrap";
import axios from "axios";
import swal from 'sweetalert'; // Importar SweetAlert
import "../../styles/car-item.css";

const CarItem = ({ id, imgUrl, marca, modelo, precio, pasajeros }) => {
    const imgStyle = {
        width: '90%',
        height: '200px', // Ajusta la altura según lo necesario
        objectFit: 'cover'
      };
  // Función para manejar el clic en "Entregado"
  const handleEntregadoClick = async () => {
    try {
      // Enviar solicitud para actualizar el estado de disponibilidad del vehículo
      await axios.put(`http://localhost:3000/vehiculos/${id}`, { disponible: true });
      // Mostrar notificación de éxito al usuario con SweetAlert
      swal("¡Vehículo entregado!", "El vehículo se ha entregado exitosamente.", "success");
    
      
    } catch (error) {
      // Mostrar notificación de error al usuario con SweetAlert
      swal("Error", "Hubo un problema al entregar el vehículo. Por favor, inténtalo de nuevo.", "error");
      console.error("Error al actualizar la disponibilidad del vehículo:", error);
    }
  };

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{marca}</h4>
          <h6 className="rent__price text-center mt-">
            ${precio}.00 <span>/ Día</span>
          </h6>
          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className="d-flex align-items-center gap-1">
              <i className="ri-roadster-fill"></i> {modelo}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-team-fill"></i> {pasajeros}
            </span>
          </div>
          <div className="car__img">
            <img src={imgUrl} alt=""style={imgStyle} />
          </div>
          {/* Agregar evento onClick y función de manejo */}
          <button className="w-50 car__item-btn car__btn-rent" onClick={handleEntregadoClick}>
            Entregado
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
