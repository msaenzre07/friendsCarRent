const mysql2 = require('mysql2');


// Configuración de la conexión a la base de datos MySQL
const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Admin123456',
  database: 'friends_car_rent'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

module.exports = connection;


