import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importar Link para manejar enlaces internos
import '../styles/historial.css';

const Historial = () => {
    const { user } = useContext(UserContext);
    const [reservaciones, setReservaciones] = useState([]);
    const id_usuario = user.id;
    useEffect(() => {
        // Fetch reservations from the API
        const fetchReservaciones = async () => {
            try {
                let response;
                if (user.rol === 'admin') {
                    // If user is admin, fetch all reservations
                    response = await axios.get(`http://localhost:3000/reservaciones`);
                } else {
                    // If user is regular user, fetch only their reservations
                    response = await axios.get(`http://localhost:3000/reservaciones/usuario/${id_usuario}`);
                }
                setReservaciones(response.data);
            } catch (error) {
                console.error('Error fetching reservations', error);
            }
        };

        if (user) {
            fetchReservaciones();
        }
    }, [user]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg="8" md="10">
                    <h2 className="history-title">Historial de Reservas</h2>
                    {user.rol === 'admin' && ( // Condición para mostrar el enlace solo si el usuario es admin
                        <Link to="/reportes">Ver reportes</Link>
                    )}
                    {reservaciones.length === 0 ? (
                        <p>No hay reservas disponibles.</p>
                    ) : (
                        reservaciones.map(reserva => (
                            <Card key={reserva._id} className="history-card">
                                <CardBody>
                                    <CardTitle tag="h5">Reserva #{reserva._id}</CardTitle>
                                    <CardText><strong>Fecha de Inicio:</strong> {new Date(reserva.fechaInicial).toLocaleDateString()}</CardText>
                                    <CardText><strong>Fecha de Fin:</strong> {new Date(reserva.fechaFinal).toLocaleDateString()}</CardText>
                                    <CardText><strong>Hora:</strong> {reserva.hora}</CardText>
                                    <CardText><strong>Lugar:</strong> {reserva.lugar}</CardText>
                                    {user.rol === 'admin' && (
                                        <CardText><strong>Usuario:</strong> {reserva.id_usuario.nombreCompleto}</CardText>
                                    )}
                                    <CardText><strong>Vehículo:</strong> {reserva.id_vehiculo.marca} {reserva.id_vehiculo.modelo}</CardText>
                                </CardBody>
                            </Card>
                        ))
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Historial;
