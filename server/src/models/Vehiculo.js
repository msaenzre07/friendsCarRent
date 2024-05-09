const connection = require('../database/db.js');

class Vehiculo {
  constructor(marca, modelo, transmision, kilometraje, precioDia) {
    this.marca = marca;
    this.modelo = modelo;
    this.transmision = transmision;
    this.kilometraje = kilometraje;
    this.precioDia = precioDia;
    this.file = file;
  }
  //Método guardar los vehículos
  // static createVehiculo(marca, modelo, transmision, kilometraje, precioDia, file) {
  //   return new Promise((resolve, reject) => {
  //     const sql = 'INSERT INTO vehiculos (marca, modelo, transmision, kilometraje, precioDia, file) VALUES (?, ?, ?, ?, ?,?)';
  //    connection.query(sql, [marca, modelo, transmision, kilometraje, precioDia, file], (error, results) => {
  //      if (error) {
  //         // Manejo del error: rechazar la promesa con el error
  //         reject({ error: 'Error al agregar el vehículo', message: error.message });
  //      } else {
  //        // Resolver la promesa con los resultados
  //        resolve({ results, message: 'Vehículo agregado exitosamente' });
  //     }
  //    });
  //  });
  // }

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

module.exports = Vehiculo;