import React from "react";
import { Form, FormGroup } from "reactstrap";
import "../../styles/devolver.css";

import Swal from "sweetalert2";

const Devolver = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Form onSubmit={submitHandler}>
      <div className="devolver">
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Fecha:
          </label>
          <input type="date" placeholder="" />
        </FormGroup>
        </div>

        <div className="devolver">
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Hora:
          </label>
          <input type="time" placeholder="" className="time__picker" />
        </FormGroup>
        </div>
        
        <div className="devolver">
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <div>
            <label htmlFor="d-flex align-items-center gap-2" className="form-label">
              Lugar:
            </label>
            <input type="text" placeholder="" />
          </div>
        </FormGroup>
        </div>
        <div
          className=" d-flex align-items-center gap-2"
          style={{ color: "#000d6b" }}
        >
          <span>
            <i className="ri-alarm-warning-fill" style={{ color: "#faa935" }}></i>
            Atención: En caso de devolver el vehículo en otro sitio y fecha
            diferente deberá pagar un adicional de $66.
          </span>
        </div>
        <div className="devolver text-center mt-5">
        <button>Reservar Ahora</button>
        </div>
      </Form>
      </>
    
  );
};
export default Devolver;
