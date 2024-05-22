const mongoose = require("mongoose");

const VehiculoSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  transmision: { type: String, required: true },
  kilometraje: { type: Number, required: true },
  precioDia: { type: Number, required: true },
  file: { type: String }  // Asumiendo que 'file' es una URL o ruta al archivo
});

module.exports = mongoose.model('Vehiculo', VehiculoSchema);

//Método guardar los vehículos
 /*
  //Método eliminar los vehículos
  static deleteVehiculo(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM vehiculos WHERE id = ?';
      connection.query(sql, [id], (error, results) => {
        if (error) {
          // Manejo del error: rechazar la promesa con el error
          reject({ error: 'Error al eliminar el vehículo', message: error.message });
        } else {
          // Resolver la promesa con los resultados
          resolve({ results, message: 'Vehículo eliminado exitosamente' });
        }
      });
    });
  }

  //Método actualizar los vehículos
  static updateVehiculo(id, marca, modelo, transmision, kilometraje, precioDia, file) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE vehiculos SET marca = ?, modelo = ?, transmision = ?, kilometraje = ?, precioDia = ?, file = ? WHERE id = ?';
      connection.query(sql, [marca, modelo, transmision, kilometraje, precioDia, file, id], (error, results) => {
        if (error) {
          // Manejo del error: rechazar la promesa con el error
          reject({ error: 'Error al actualizar el vehículo', message: error.message });
        } else {
          // Resolver la promesa con los resultados
          resolve({ results, message: 'Vehículo actualizado exitosamente' });
        }
      });
    });
  }

  //Método obtener los vehículos
  static getVehiculo(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM vehiculos WHERE id = ?';
      connection.query(sql, [id], (error, results) => {
        if (error) {
          // Manejo del error: rechazar la promesa con el error
          reject({ error: 'Error al obtener el vehículo', message: error.message });
        } else {
          // Resolver la promesa con los resultados
          resolve({ results, message: 'Vehículo obtenido exitosamente' });
        }
      });
    });
  }

}
*/
