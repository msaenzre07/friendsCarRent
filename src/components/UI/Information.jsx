import React from "react";
import Slider from "react-slick";

import "../../styles/information.css";

const Information = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="information py-4 px-3">
        <p
          className="section__description"
          style={{ textAlign: "justify", color: "black" }}
        >
          El conductor debera de presentar la licencia de conducir vigente,
          cédula de identidad o pasaporte. La edad mínima para alquilar un auto
          es de 21 años, mínimo un año de haber obtenido la licencia de
          conducir. Si es extrajero debera de realizar un depósito de garantía
          por setecientos cincuenta dólares "$750" en tarjeta de crédito o
          efectivo. Para las personas nacionales debera de realizar un depósito
          de tresciento mil colones netos "300 000" o firmar un documento de
          respaldo fiduciario para uso en caso de accidente como deducible de
          póliza.{" "}
        </p>
      </div>

      <div className="information py-4 px-3">
        <p
          className="section__description"
          style={{ textAlign: "justify", color: "black" }}
        >
          El cliente debe de presentarse en la Sede central en Alajuela, San
          Carlos, Ciudad Quesada para formalizar el pago del alquiler del
          vehículo. Nuestro horario de atención al cliente es de 09:00am a
          05:00pm de lunes a domingo. También puede enviarnos un correo
          electrónico o comunicarse al teléfono de la agencia.{" "}
        </p>
      </div>

      <div className="information py-4 px-3">
        <p
          className="section__description"
          style={{ textAlign: "justify", color: "black" }}
        >
          En caso de devolver el vehículo en otro sitio, fecha y hora diferente,
          el cliente debera de pagar un adicional de sensenta y seis dólares
          "$66".
        </p>
      </div>

      <div className="information py-4 px-3">
        <p
          className="section__description"
          style={{ textAlign: "justify", color: "black" }}
        >
          En caso de un accidente, los clientes están obligados a llamar al 911
          y realizar el reporte del accidente. Así mismo es esencial informar
          sobre cualquier daño a la agencia de alquiler lo antes posible.
        </p>
      </div>
    </Slider>
  );
};

export default Information;
