import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Form } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

 //Cambiadaaaaaaaaaaaa

function Vehiculos() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [transmision, setTransmision] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [precioDia, setPrecioDia] = useState("");
  const [file, setFile] = useState(null);
  const [disponible, setDisponible] = useState(true);
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [vehiculosList, setVehiculosList] = useState([]);
  const [pasajeros, setPasajeros] = useState(0);

  useEffect(() => {
    getVehiculos();
  }, []);

  const getVehiculos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/vehiculos");
      setVehiculosList(response.data);
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editar) {
      await updateVehiculos();
    } else {
      await createVehiculos();
    }
  };

  const createVehiculos = async () => {
    try {
      const formData = new FormData();
      formData.append('marca', marca);
      formData.append('modelo', modelo);
      formData.append('transmision', transmision);
      formData.append('kilometraje', kilometraje);
      formData.append('precioDia', precioDia);
      formData.append('file', file);
      formData.append('disponible', disponible);
      formData.append('pasajeros', pasajeros);

      const response = await axios.post("http://localhost:3000/vehiculos", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.status === "Success") {
        await getVehiculos();
        limpiarCampos();
        showSuccessAlert(`Vehículo ${marca} creado exitosamente`);
      } else {
        showErrorAlert("Error al crear vehículo. Intente más tarde.");
      }
    } catch (error) {
      handleRequestError(error);
    }
  };

  const updateVehiculos = async () => {
    try {
      if (!id) {
        throw new Error("El ID del vehículo no está definido");
      }

      const formData = new FormData();
      formData.append("marca", marca);
      formData.append("modelo", modelo);
      formData.append("transmision", transmision);
      formData.append("kilometraje", kilometraje);
      formData.append("precioDia", precioDia);
      formData.append("file", file);
      formData.append("disponible", disponible);
      formData.append('pasajeros', pasajeros);

      const response = await axios.put(
        `http://localhost:3000/vehiculos/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.data.Status === "Success") {
        await getVehiculos();
        limpiarCampos();
        showSuccessAlert(`El vehículo ${marca} fue actualizado con éxito`);
      } else {
        showErrorAlert("Error al actualizar vehículo. Intente más tarde.");
      }
    } catch (error) {
      handleRequestError(error);
    }
  };

  const deleteVehiculos = async (val) => {
    try {
      const result = await Swal.fire({
        title: "Confirmar eliminación",
        html:
          `<i>Realmente desea eliminar a <strong>${val.marca}</strong>?</i>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo!",
      });
      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:3000/vehiculos/${val._id}`);
        if (response.status === 200) {
          await getVehiculos();
          limpiarCampos();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${val.marca} fue eliminado`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          throw new Error("Error al eliminar el vehículo");
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró eliminar el vehículo!",
        footer:
          JSON.parse(JSON.stringify(error)).message === "Network Error"
            ? "Intente más tarde"
            : JSON.parse(JSON.stringify(error)).message,
      });
    }
  };

  const limpiarCampos = () => {
    setMarca("");
    setModelo("");
    setTransmision("");
    setKilometraje("");
    setPrecioDia("");
    setFile(null);
    setId("");
    setDisponible(true);
    setEditar(false);
    setPasajeros(0);
  };

  const editarVehiculos = (val) => {
    setEditar(true);
    setMarca(val.marca);
    setModelo(val.modelo);
    setTransmision(val.transmision);
    setKilometraje(val.kilometraje);
    setPrecioDia(val.precioDia);
    setId(val._id);
    setDisponible(val.disponible);
    setPasajeros(val.pasajeros);
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: message,
    });
  };

  const handleRequestError = (error) => {
    let errorMessage = "Intente más tarde";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    showErrorAlert(errorMessage);
  };

  const handlePasajerosChange = (event) => {
    setPasajeros(event.target.value);
  };

  return (
    <Helmet title="Mantenimiento de Vehículos">
      <CommonSection title="Mantenimiento de Vehículos" />
      <section>
        <Container>
          <Row>
            <div className="container">
              <div className="card text-center">
                <Form onSubmit={handleSubmit}>
                  <div className="card-header">Gestión de vehículos</div>
                  <div className="card-body">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Marca: </span>
                      <input
                        id="marca"
                        type="text"
                        name="marca"
                        value={marca}
                        onChange={(event) => {
                          setMarca(event.target.value);
                        }}
                        className="form-control"
                        placeholder="Ingrese una marca"
                        required={true}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Modelo: </span>
                      <input
                        id="modelo"
                        type="text"
                        name="modelo"
                        value={modelo}
                        onChange={(event) => {
                          setModelo(event.target.value);
                        }}
                        className="form-control"
                        aria-label="Modelo"
                        aria-describedby="basic-addon1"
                        placeholder="Ingrese un modelo"
                        required={true}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <select
                        className="form-select"
                        aria-label="Transmisión"
                        id="transmision"
                        type="text"
                        name="transmision"
                        value={transmision}
                        onChange={(event) => {
                          setTransmision(event.target.value);
                        }}
                      >
                        <option value="">Transmisión</option>
                        <option value="Automático">Automático</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Kilometraje: </span>

                      <input
                        id="kilometraje"
                        type="number"
                        name="kilometraje"
                        value={kilometraje}
                        onChange={(event) => {
                          setKilometraje(event.target.value);
                        }}
                        className="form-control"
                        aria-label="Kilometraje"
                        aria-describedby="basic-addon1"
                        placeholder="Ingrese el kilometraje"
                        required={true}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Precio por día: </span>
                      <input
                        id="precioDia"
                        type="number"
                        name="precioDia"
                        value={precioDia}
                        onChange={(event) => {
                          setPrecioDia(event.target.value);
                        }}
                        className="form-control"
                        aria-label="Precio por día"
                        aria-describedby="basic-addon1"
                        placeholder="Ingrese el precio por día"
                        required={true}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Pasajeros: </span>
                      <input
                        id="pasajeros"
                        type="number"
                        name="pasajeros"
                        value={pasajeros}
                        onChange={handlePasajerosChange}
                        className="form-control"
                        aria-label="Pasajeros"
                        aria-describedby="basic-addon1"
                        placeholder="Número de pasajeros"
                        required={true}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <label htmlFor="disponible" className="input-group-text">
                        Disponible:
                      </label>
                      <select
                        id="disponible"
                        name="disponible"
                        className="form-select"
                        value={disponible}
                        onChange={(event) => {
                          setDisponible(event.target.value);
                        }}
                      >
                        <option value={true}>Activo</option>
                        <option value={false}>Inactivo</option>
                      </select>
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Foto: </span>
                      <input
                        id="file"
                        type="file"
                        name="file"
                        accept=".jpg, .png, .jpeg"
                        onChange={handleFileChange}
                        className="form-control"
                      />
                    </div>


                  <div className="card-footer text-muted">
                    <button type="submit" className="btn btn-success m-1">
                      {editar ? "Actualizar" : "Guardar"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning m-1"
                      onClick={limpiarCampos}
                    >
                      Cancelar
                    </button>
                  </div>
                  </div>
                </Form>
              </div>

              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Transmisión</th>
                    <th>Kilometraje</th>
                    <th>Precio/día</th>
                    <th>Pasajeros</th>
                    <th>Disponible</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiculosList.map((val, key) => (
                    <tr key={val._id}>
                      <td>{val.marca}</td>
                      <td>{val.modelo}</td>
                      <td>{val.transmision}</td>
                      <td>{val.kilometraje}</td>
                      <td>{val.precioDia}</td>
                      <td>{val.pasajeros}</td>
                      <td>{val.disponible ? "Activo" : "Inactivo"}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => editarVehiculos(val)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteVehiculos(val)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Vehiculos;
