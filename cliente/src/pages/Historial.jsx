import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'; // Importar componentes de react-pdf
import '../styles/historial.css';

// Estilos para el PDF
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    card: {
        marginBottom: 20,
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
    },
    cardTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    cardText: {
        marginBottom: 5,
    },
});

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
    // Función para obtener el nombre completo del usuario
    const getUserName = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/usuarios/${userId}`);
            return response.data.nombreCompleto;
        } catch (error) {
            console.error('Error fetching user name', error);
            return 'Nombre no disponible';
        }
    };

    // Función para obtener la marca del vehículo
    const getVehicleBrand = async (vehicleId) => {
        try {
            const response = await axios.get(`http://localhost:3000/vehiculos/${vehicleId}`);
            return response.data.marca;
        } catch (error) {
            console.error('Error fetching vehicle brand', error);
            return 'Marca no disponible';
        }
    };
    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg="8" md="10">
                    <h2 className="history-title">Historial de Reservas</h2>
                    {user.rol === 'admin' && (
                        <Link to="/reportes">Ver reportes</Link>
                    )}
                    <PDFDownloadLink document={<HistorialPDF reservaciones={reservaciones} />} fileName="historial.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Cargando...' : 'Descargar historial como PDF')}
                    </PDFDownloadLink>
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

// Componente para el contenido del PDF
const HistorialPDF = ({ reservaciones }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View>
                <Text style={styles.title}>Historial de Reservas</Text>
                {reservaciones.map(reserva => (
                    <View key={reserva._id} style={styles.card}>
                        <Text style={styles.cardTitle}>Reserva #{reserva._id}</Text>
                        <Text style={styles.cardText}>Fecha de Inicio: {new Date(reserva.fechaInicial).toLocaleDateString()}</Text>
                        <Text style={styles.cardText}>Fecha de Fin: {new Date(reserva.fechaFinal).toLocaleDateString()}</Text>
                        <Text style={styles.cardText}>Hora: {reserva.hora}</Text>
                        <Text style={styles.cardText}>Lugar: {reserva.lugar}</Text>
                        {reserva.id_usuario && (
                            <Text style={styles.cardText}>Usuario: {reserva.id_usuario.nombreCompleto}</Text>
                        )}
                        <Text style={styles.cardText}>Vehículo: {reserva.id_vehiculo.marca} {reserva.id_vehiculo.modelo}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default Historial;
