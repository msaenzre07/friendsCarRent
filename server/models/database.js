const mysql2 = require('mysql2');


// Función para crear y devolver una nueva conexión a la base de datos MySQL
const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Admin123456',
  database: 'friends_car_rent'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }

  console.log('Conectado a la base de datos!');
});

