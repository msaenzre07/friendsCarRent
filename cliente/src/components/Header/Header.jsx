import React, { useRef } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";


const navLinks = [
{
path: "/home",
display: "Home",
},
{
path: "/about",
display: "¿Quiénes Somos?",
},
    
{
path: "/vehiculos",
display: "Mantenimiento de Autos",
},
{
path: "/cars",
display: "Reservar",
},
{
path: "/Reservar",
display: "Información de Reserva",
},
{
  path: "/contacto",
  display: "Contáctenos",
},
  
];

const Header = () => {
    const menuRef = useRef(null);

    const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
   
    return (
        <header className="header">
            {/*--------  header top-------*/}
             <div className="header__top">
                <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span className="header__top__help">
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <button className = "btn secondary_btn">
                <Link to="/login" className=" d-flex align-items-center gap-1">
                  <i className="ri-login-circle-fill" style={{ color: '#D2691E'}}></i> Iniciar sesión
                </Link>
                </button>

                <button className="btn primary_btn">
                <Link to="/registro" className=" d-flex align-items-center gap-1">
                  <i className="ri-user-fill" style={{ color: '#D2691E'}}></i> Registrarse
                </Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

     {/*--------  header middle-------*/}
     <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo" >
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i className="ri-roadster-fill"></i>
                    <span>
                      Friend's <br /> Car Rent 
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-map-pin-line" style={{ color: '#D2691E'}}></i>
                </span>
                <div className="header__location-content">
                  <h4>Alajuela</h4>
                  <h6>San Carlos, Ciudad Quesada</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-timer-line" style={{ color: '#D2691E'}}></i>
                </span>
                <div className="header__location-content">
                  <h4>Lunes a Domingo</h4>
                  <h6>09am - 5pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
              <a href="https://wa.me/50686870428?text=¡Hola! Necesito información para realizar una reservación de vehículo" target="_blank" rel="noopener noreferrer">
       
            
         <i className="ri-whatsapp-fill" style={{ color: '#15D158', fontSize: '20px'}}></i> Contáctenos
  </a>
   
              </button>
            </Col>
          </Row>
        </Container>
      </div>

        {/*--------  main navigation-------*/}

        <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navclassName) =>
                      navclassName.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>      
    );
};

export default Header;