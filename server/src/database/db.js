const mysql2 = require('mysql2');

// Configuración de la conexión a la base de datos MySQL
const connection =  mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Admin123456',
  database: 'friends_car_rent',
  port: 3306,
});

connection.connect(function(err) {
  if (err){
    console.log("Error en la conexión");
} else {
  console.log("Conexión a MYSQL exitosa!");
}
});

module.exports = connection;