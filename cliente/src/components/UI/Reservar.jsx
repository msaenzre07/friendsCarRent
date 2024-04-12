import React from "react";
import "../../styles/reservar.css";
import { Form, FormGroup } from "reactstrap";

import Swal from "sweetalert2";

const Reservar = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Nombre completo:
        </label>
        <div>
          <input type="text" placeholder="" />
        </div>
      </FormGroup>

      <div>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Cantidad de días del alquiler del auto:
          </label>
          <input type="number" placeholder="" />
        </FormGroup>
      </div>

      <div>
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Fecha inicial de la reservación:
          </label>
          <input type="date" placeholder="" />
        </FormGroup>
      </div>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Fecha final de la reservación:
        </label>
        <div>
          <input type="date" placeholder="" />
        </div>
      </FormGroup>
    </Form>
  );
};
export default Reservar;
