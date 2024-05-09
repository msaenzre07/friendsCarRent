import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";


const CarItem = (props) => {
  const { imgUrl, marca, modelo, precio, pasajeros } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
     
     
     
      <div className="car__item" >
     

      <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{marca}</h4>
          <h6 className="rent__price text-center mt-">
            ${precio}.00 <span>/ Día</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-roadster-fill"></i> {modelo}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-team-fill"></i> {pasajeros} 
            </span>
            </div>

        <div className="car__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div>

      
          
        <button className=" w-50 car__item-btn car__btn-rent" >
            <Link to={`/cars/${marca}`}>Reservar</Link>
          </button>
        
        </div>
      </div>
     
    </Col>
  );
};

export default CarItem;
