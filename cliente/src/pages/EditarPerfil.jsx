import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

const EditarPerfil = () => {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState({
        phone: '',
        nacionalidad: '',
        tipoIdentificacion: '',
        cedula: '',
        fechanacimiento: ''
    });
    const navigate = useNavigate();
    const id = user.id;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
                setUserData({
                    phone: response.data.phone || '',
                    nacionalidad: response.data.nacionalidad || '',
                    tipoIdentificacion: response.data.tipoIdentificacion || '',
                    cedula: response.data.cedula || '',
                    fechanacimiento: response.data.fechanacimiento ? new Date(response.data.fechanacimiento).toISOString().split('T')[0] : ''
                });
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/usuarios/${id}`, userData);
            alert('Perfil actualizado correctamente');
            navigate('/perfil');
        } catch (error) {
            console.error('Error updating user data', error);
            alert('Error al actualizar el perfil');
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg="6" md="8" sm="10">
                    <Card className="profile-card">
                        <CardBody>
                            <CardTitle tag="h3">Editar Perfil</CardTitle>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="phone">Teléfono</Label>
                                    <Input type="text" name="phone" id="phone" value={userData.phone} onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="nacionalidad">Nacionalidad</Label>
                                    <Input type="text" name="nacionalidad" id="nacionalidad" value={userData.nacionalidad} onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="tipoIdentificacion">Tipo de Identificación</Label>
                                    <Input type="text" name="tipoIdentificacion" id="tipoIdentificacion" value={userData.tipoIdentificacion} onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cedula">Cédula</Label>
                                    <Input type="text" name="cedula" id="cedula" value={userData.cedula} onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fechanacimiento">Fecha de Nacimiento</Label>
                                    <Input type="date" name="fechanacimiento" id="fechanacimiento" value={userData.fechanacimiento} onChange={handleChange} />
                                </FormGroup>
                                <Button color="primary" type="submit">Guardar cambios</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EditarPerfil;
