import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function Vehiculos() {
  // variables que guardan características de vehículos
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [transmision, setTransmision] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [precioDia, setPrecioDia] = useState("");
  const [file, setFile] = useState();
  const [id, setId] = useState();
  const [editar, setEditar] = useState(false);
  const [vehiculosList, setVehiculos] = useState([]); //Lista de Vehiculos-se inicializa una lista vacía

  //CRUD- Add a una Lista de Vehiculos (viene los datos que obtenemos desde la API
  //UseEffect  Realizar la llamada a la API una vez que el componente se monta.
  useEffect(() => {
    getVehiculos(); // Llama a la función getVehiculos una vez que el componente se monta
  }, []); // El segundo parámetro [] indica que se ejecutará solo en la primera renderización

  const getVehiculos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getVehiculos");
      setVehiculos(response.data); // Asigna los vehículos obtenidos desde la API
      //alert("Vehículo registrado con éxito"); // Se mostrará un mensaje cuando la solicitud sea exitosa
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Vehículos obtenidos con éxito",
        timer: 1500,
      });  
    } catch (error) {
      //console.error("Error al obtener los vehículos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al obtener los vehículos",
      });
    }
  };

  //CRUD-Función add Vehiculos
  const createVehiculos = async () => {
    try {
      const formData = new FormData();
      formData.append("marca", marca);
      formData.append("modelo", modelo);
      formData.append("transmision", transmision);
      formData.append("kilometraje", kilometraje);
      formData.append("precioDia", precioDia);
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3001/createVehiculos",
        formData
      );

      if (response.data.Status === "Success") {
        await getVehiculos(); // Vuelve a obtener los vehículos después de agregar uno nuevo
        limpiarCampos(); //Limpia los campos del formulario
        Swal.fire({
          title: "<strong>Registro exitoso!!!</strong>",
          html:
            "<i>El vehículo <strong> " +
            marca +
            " </strong>fue registrado con exito!!!</i>",
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
      //console.error("Error al agregar el vehículo:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          JSON.parse(JSON.stringify(error)).message === "Network Error"
            ? "Intente más tarde"
            : JSON.parse(JSON.stringify(error)).message,
      });
    }
  };

  //CRUD-update  Vehiculos ruta
  const updateVehiculos = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("marca", marca);
      formData.append("modelo", modelo);
      formData.append("transmision", transmision);
      formData.append("kilometraje", kilometraje);
      formData.append("precioDia", precioDia);
      formData.append("file", file);

      const response = await axios.put(
        "http://localhost:3001/updateVehiculos",
        formData
      );

      if (response.data.Status === "Success") {
        await getVehiculos(); // Vuelve a obtener los vehículos después de la actualización
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización exitosa!!!</strong>",
          html:
            "<i>El vehículo <strong> " +
            marca +
            " </strong>fue actualizado con exito!!!</i>",
          icon: "sucess",
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al actualizar vehículo. Intente más tarde.",
        });
      }
      //console.error("Error al actualizar el vehículo:", error);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          JSON.parse(JSON.stringify(error)).message === "Network Error"
            ? "Intente más tarde"
            : JSON.parse(JSON.stringify(error)).message,
      });
    }
  };

  //CRUD-delete  Vehiculos ruta
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
        const response =  await axios.delete(`http://localhost:3001/deleteVehiculos/${val.id}`);
        if (response.status === 200) {
        await getVehiculos(); // Vuelve a obtener los vehículos después de eliminar uno
        limpiarCampos();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: val.marca + "fue eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
      }else {
        throw new Error("Error al eliminar el vehículo");
      }
    }
    } catch (error) {
      //console.error("Error al eliminar el vehículo:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logro eliminar el vehículo!",
        footer:
          JSON.parse(JSON.stringify(error)).message === "Network Error"
            ? "Intente más tarde"
            : JSON.parse(JSON.stringify(error)).message,
      });
    }
  };

  //VERIFICAR LOS CAMPOS QUE NO SE LIMPIAN Y PONER LA VARIABLE AQUI O QUITAR
  const limpiarCampos = () => {
    setMarca("");
    setModelo("");
    setTransmision("");
    setKilometraje("");
    setPrecioDia("");
    setFile("");
    setId("");
    setEditar(false);
  };

  //CRUD-Editar vehículos
  const editarVehiculos = (val) => {
    setEditar(true);
    setMarca(val.marca);
    setModelo(val.modelo);
    setTransmision(val.transmision);
    setKilometraje(val.kilometraje);
    setPrecioDia(val.precioDia);
    setFile(val.file);
    setId(val.id);
  };

  return (
    <Helmet title="Mantenimiento de Vehículos">
      <CommonSection title="Mantenimiento de Vehículos" />
      <section>
        <Container>
          <Row>
            <div className="container">
              <div className="card text-center">
                <div className="card-header">Gestión de vehículos</div>
                <div className="card-body">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Marca: </span>
                    <input
                      type="text"
                      id="marca"
                      value={marca}
                      onChange={(event) => {
                        setMarca(event.target.value);
                      }} //se envia la info mediante event que cont los datos y los asigna a setMarca
                      className="form-control"
                      placeholder="Ingrese una marca"
                      required={true}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Modelo: </span>
                    <input
                      type="number"
                      id="Modelo"
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
                      type="number"
                      id="kilometraje"
                      value={kilometraje}
                      onChange={(event) => {
                        setKilometraje(event.target.value);
                      }}
                      className="form-control"
                      aria-label="kilometraje"
                      aria-describedby="basic-addon1"
                      placeholder="Ingrese el kilometraje"
                      required={true}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Precio por día: </span>

                    <input
                      type="number"
                      id="precio por día"
                      value={precioDia}
                      onChange={(event) => {
                        setPrecioDia(event.target.value);
                      }}
                      className="form-control"
                      aria-label="precioDia"
                      aria-describedby="basic-addon1"
                      placeholder="Ingrese el precio por día"
                      required={true}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <input
                      type="file"
                      onChange={(event) => setFile(event.target.files[0])}
                      className="form-control"
                      id="inputGroupFile02"
                      multiple={false} // Permitir solo una imagen a la vez
                    />
                  </div>
                  <div className="input-group mb-3">
                    Tamaño máximo de archivo 50 MB.
                  </div>
                </div>

                <div className="card-footer text-body-muted">
                  {editar ? (
                    <div>
                      <button
                        className="btn btn-warning m-2"
                        onClick={updateVehiculos}
                      >
                        Actualizar
                      </button>
                      <button
                        className="btn btn-info m-2"
                        onClick={limpiarCampos}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={createVehiculos}
                    >
                      Registrar
                    </button>
                  )}
                </div>
              </div>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
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
                      <tr key={val.id}>
                        <th>{val.id}</th>
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
                                deleteVehiculos(val.id);
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
