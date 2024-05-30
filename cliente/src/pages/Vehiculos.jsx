import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Form } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

function Vehiculos() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [transmision, setTransmision] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [precioDia, setPrecioDia] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(""); // Agrega esto para manejar la URL del archivo
  const [disponible, setDisponible] = useState(true);
  const [_id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [vehiculosList, setVehiculosList] = useState([]);

  useEffect(() => {
    getVehiculos();
  }, []);

  const getVehiculos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/vehiculos");
      setVehiculosList(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al obtener los vehículos",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editar) {
      updateVehiculos();
    } else {
      createVehiculos();
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const createVehiculos = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('marca', marca);
      formData.append('modelo', modelo);
      formData.append('transmision', transmision);
      formData.append('kilometraje', kilometraje);
      formData.append('precioDia', precioDia);
      formData.append('disponible', disponible);

      const response = await axios.post('http://localhost:3000/vehiculos', formData);
      
      if (response.data.Status === "Success") {
        await getVehiculos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro exitoso!!!</strong>",
          text: "El vehículo " + marca + " fue registrado con éxito!!!",
          icon: "success",
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al crear vehículo. Intente más tarde.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response ? error.response.data.message : "Intente más tarde",
      });
    }
  };

  const updateVehiculos = async () => {
    try {
      if (!_id) {
        throw new Error("El ID del vehículo no está definido");
      }

      const formData = new FormData();
      formData.append("_id", _id);
      formData.append("marca", marca);
      formData.append("modelo", modelo);
      formData.append("transmision", transmision);
      formData.append("kilometraje", kilometraje);
      formData.append("precioDia", precioDia);
      if (file) {
        formData.append("file", file);
      }
      formData.append("disponible", disponible);

      const response = await axios.put(
        `http://localhost:3000/vehiculos/${_id}`,
        formData
      );

      if (response.data.Status === "Success") {
        await getVehiculos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización exitosa!!!</strong>",
          text: `El vehículo ${marca} fue actualizado con éxito!!!`,
          icon: "success",
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al actualizar vehículo. Intente más tarde.",
        });
      }
    } catch (error) {
      let errorMessage = "Intente más tarde"; // Mensaje predeterminado
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  };

  const deleteVehiculos = async (val) => {
    try {
      const result = await Swal.fire({
        title: "Confirmar eliminado?",
        html:
          "<i>Realmente desea eliminar a <strong> " +
          val.marca +
          " </strong>fue eliminado con éxito!!!</i>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminarlo!",
      });
      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:3000/vehiculos/${val._id}`);
        if (response.status === 200) {
          await getVehiculos();
          limpiarCampos();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: val.marca + "fue eliminado",
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
    setFileUrl(""); // Limpiar la URL del archivo
    setId("");
    setDisponible(true);
    setEditar(false);
  };

  const editarVehiculos = (val) => {
    setEditar(true);
    setMarca(val.marca);
    setModelo(val.modelo);
    setTransmision(val.transmision);
    setKilometraje(val.kilometraje);
    setPrecioDia(val.precioDia);
    setFileUrl(val.file); // Guardar la URL del archivo en lugar del archivo en sí
    setId(val._id);
    setDisponible(val.disponible);
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
                        type="number"
                        id="precioDia"
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
                      <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        className="form-control"
                        id="inputGroupFile02"
                        multiple={false}
                      />
                    </div>
                    {fileUrl && (
                      <div className="input-group mb-3">
                        <span>Archivo actual: {fileUrl}</span>
                      </div>
                    )}
                    <div className="input-group mb-3">
                      Tamaño máximo de archivo 50 MB.
                    </div>
                  
                  </div>

                  <div className="card-footer text-body-muted">
                    {editar ? (
                      <div>
                        <button
                          className="btn btn-warning m-2"
                          type="submit"
                        >
                          Actualizar
                        </button>
                        <button
                          className="btn btn-info m-2"
                          type="button"
                          onClick={limpiarCampos}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-success"
                        type="submit"
                      >
                        Registrar
                      </button>
                    )}
                  </div>
                </Form>
              </div>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Transmisión</th>
                    <th scope="col">Kilometraje</th>
                    <th scope="col">Precio por día</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiculosList.map((val, key) => {
                    return (
                      <tr key={val._id}>
                        <td>{val.marca}</td>
                        <td>{val.modelo}</td>
                        <td>{val.transmision}</td>
                        <td>{val.kilometraje}</td>
                        <td>{val.precioDia}</td>
                        <td>
                          <img
                            src={val.file}
                            alt="Imagen de vehículo"
                            style={{ maxWidth: "100px" }}
                          />
                        </td>
                        <td>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                editarVehiculos(val);
                              }}
                              className="btn btn-info"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                deleteVehiculos(val);
                              }}
                              className="btn btn-danger"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
