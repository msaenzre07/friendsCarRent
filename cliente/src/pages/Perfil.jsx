import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { UserContext } from '../UserContext';
import axios from 'axios';
import '../styles/profile.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

const Perfil = () => {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate(); // Inicializar useNavigate

    const id = user.id;

    useEffect(() => {
        // Fetch user data from the API
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
                setUserData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    if (!userData) {
        return <div>Cargando...</div>;
    }

    return (
        <Helmet title="Datos del Usuario">
      <CommonSection title="Datos del Usuario" />
      <section>
        <Container>
            <Row className="justify-content-center">
                <Col lg="6" md="8" sm="10">
                    <Card className="profile-card">
                        <CardBody>
                            <CardTitle tag="h3">Perfil de Usuario</CardTitle>
                            <CardText><strong>Nombre de usuario:</strong> {userData.nombreCompleto}</CardText>
                            <CardText><strong>Email:</strong> {userData.email}</CardText>
                            <CardText><strong>Nombre completo:</strong> {userData.nombreCompleto}</CardText>
                            <CardText><strong>Teléfono:</strong> {userData.phone}</CardText>
                            <CardText><strong>Nacionalidad:</strong> {userData.nacionalidad}</CardText>
                            <CardText><strong>Tipo de Identificación:</strong> {userData.tipoIdentificacion}</CardText>
                            <CardText><strong>Cédula:</strong> {userData.cedula}</CardText>
                            <CardText><strong>Fecha de Nacimiento:</strong> {new Date(userData.fechanacimiento).toLocaleDateString()}</CardText>
                            <Button color="primary" onClick={() => navigate('/perfilEditar')}>
                                Editar perfil
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
          
          </section>
        </Helmet>
    );
};

export default Perfil;
