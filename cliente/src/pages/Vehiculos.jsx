import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";


function Vehiculos () {
  // variables que guardan características de vehículos
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [transmision, setTransmision] = useState("");
  const [kilometraje, setKilometraje] = useState ("");
  const[precioDia, setPrecioDia] = useState ("");
  const [file, setFile] = useState ();
  const [id, setId] = useState();
  const [editar, setEditar] = useState(false);
  const [vehiculosList, setVehiculos] = useState([]);//Lista de Vehiculos-se inicializa una lista vacía

  const handleFile = (e) =>{
   setFile(e.target.files[0]);
  }
  const handleUpload = () =>{
    const formdata = new FormData();
    formdata.append('image', file);
    axios.post('http://localhost:3001/upload', formdata)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }


  useEffect(() => {
    getVehiculos(); // Llama a la función getVehiculos una vez que el componente se monta
  }, []); // El segundo parámetro [] indica que se ejecutará solo en la primera renderización

  //CRUD-Add Vehiculos
const add = () => {
    axios.post("http://localhost:3001/create", {
        marca: marca,
        modelo: modelo,
        transmision: transmision,
        kilometraje: kilometraje,
        precioDia: precioDia,
        
      
      })
      .then(() => {
        getVehiculos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro exitoso!!!</strong>",
          html:
            "<i>El vehículo <strong> " +
            marca +
            " </strong>fue registrado con exito!!!</i>",
          icon: "sucess",
          timer: 3000,
        }).catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
              JSON.parse(JSON.stringify(error)).message === "Network Error"
                ? "Intente más tarde"
                : JSON.parse(JSON.stringify(error)).message,
          });
        });
      });
  };

//CRUD-update  Vehiculos ruta
const update = () => {
    axios.put("http://localhost:3001/update", {
        id: id,
        marca: marca,
        modelo: modelo,
        transmision: transmision,
        kilometraje: kilometraje,
        precioDia: precioDia,
      
      
      })
      .then(() => {
        getVehiculos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización exitosa!!!</strong>",
          html:
            "<i>El vehículo <strong> "+marca+" </strong>fue actualizado con exito!!!</i>",
          icon: "sucess",
          timer: 3000,
        }).catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
              JSON.parse(JSON.stringify(error)).message === "Network Error"
                ? "Intente más tarde"
                : JSON.parse(JSON.stringify(error)).message,
          });
        });
      });
  };

  //CRUD-delete  Vehiculos ruta
const deleteVehiculos = (val) => {
  Swal.fire({
    title: "Confirmar eliminado?",
    html:
      "<i>Realmente desea eliminar a <strong> " +
      val.marca +
      " </strong>fue actualizado con exito!!!</i>",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminarlo!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:3001/delete/${val.id}`)
        .then(() => {
          getVehiculos();
          limpiarCampos();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: val.marca + "fue eliminado",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logro eliminar el vehículo!",
            footer:
              JSON.parse(JSON.stringify(error)).message === "Network Error"
                ? "Intente más tarde"
                : JSON.parse(JSON.stringify(error)).message,
          });
        });
    }
  });
};

  //VERIFICAR LOS CAMPOS QUE NO SE LIMPIAN Y PONER LA VARIABLE AQUI O QUITAR
const limpiarCampos = () => {
    setMarca("");
    setModelo("");
    setTransmision("");
    setKilometraje("");
    setPrecioDia("");
   
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
   
    setId(val.id);
  };

 //CRUD- Add a una Lista de Vehiculos (viene los datos que obtenemos desde la API
 const getVehiculos = () => {
  axios.get("http://localhost:3001/Vehiculos").then((response) => {
    setVehiculos(response.data); //asigna los vehiculos y hace una llamada de los datos desde API
    alert("Vehículo registrado");
  });
};
getVehiculos();
 

 




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
                    <span className="input-group-text" id="basic-addon1">
                      Marca: </span>
                    <input  type="text"
                     value={marca}  
                     onChange={(event) => {
                      setMarca(event.target.value);//se envia la info mediante event que cont los datos y los asigna a setMarca
                    }}
                      className="form-control"
                     
                      placeholder="Ingrese una marca"
                      aria-label="Marca"
                      aria-describedby="basic-addon1"
                    />
                  </div>


                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Modelo:  </span>
                    <input  type="number"
                       value={modelo}
                    onChange={(event) => {
                      setModelo(event.target.value);
                    
                      }} 
                      className="form-control"
                      placeholder="Ingrese un modelo"
                      aria-label="Modelo"
                      aria-describedby="basic-addon1"
                    />
                  </div>
              
                
                  <div className="input-group mb-3">      
                     <select className="form-select"                      
                    aria-label="Transmisión" id="transmision" 
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
                    <span className="input-group-text" id="basic-addon1">
                      Kilometraje: </span>
                   
                    <input   type="number"
                     value ={kilometraje} 
                     onChange={(event) => {
                      setKilometraje(event.target.value);
                      }}
                     
                      className="form-control"
                      placeholder="Ingrese el kilometraje"
                      aria-label="kilometraje"
                      aria-describedby="basic-addon1"
                  />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Precio por día: </span>
                 
                    <input  type="number" 
                    value ={precioDia}  
                    onChange={(event) => {
                        setPrecioDia(event.target.value);
                      }}

                      className="form-control"
                      placeholder="Ingrese el precio por día"
                      aria-label="precioDia"
                      aria-describedby="basic-addon1"
                  />
                  </div>

                  <div className="input-group mb-3">
  <input type="file" className="form-control" id="inputGroupFile02" onChange={handleFile}/>
  <button className="input-group-text" htmlFor="inputGroupFile02" ype="button" onClick={handleUpload}>Agregar Imagen</button>
</div>



                
                 

                </div>
                <div className="card-footer text-body-muted">
                  {editar ? (
                    <div>
                      <button
                        className="btn btn-warning m-2"
                        onClick={update}
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
                    <button className="btn btn-success" type="submit" onClick={add}>
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
                             
                {
                    vehiculosList.map((val, key) => {
                    return (
                      <tr key={val.id}>
                        <th>{val.id}</th>
                        <td>{val.marca}</td>
                        <td>{val.modelo}</td>
                        <td>{val.transmision}</td>
                        <td>{val.kilometraje}</td>
                        <td>{val.precioDia}</td>
                        <td>{val.file}</td>
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
};
export default Vehiculos;
