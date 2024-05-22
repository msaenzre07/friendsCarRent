-- to create a new database
CREATE DATABASE friends_car_rent;

-- to use database
USE friends_car_rent;



-- creating a new table
CREATE TABLE Usuarios(
id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(255) NOT NULL UNIQUE,
   contrasena VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- to show all tables
SHOW TABLE;

----add column in the table----

ALTER TABLE Vehiculos ADD COLUMN imagen BLOB;

-- to describe table
describe Usuarios;

SELECT * FROM Usuarios;

CREATE TABLE Registro (
    id INT AUTO_INCREMENT PRIMARY KEY,
   correo VARCHAR(255) NOT NULL UNIQUE,
   contrasena VARCHAR(255) NOT NULL,
    repetirContrasena VARCHAR(255) NOT NULL,
    FOREIGN KEY (correo) REFERENCES Usuarios(correo),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


SELECT * FROM Registro;

CREATE TABLE Vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(255),
    modelo VARCHAR(255),
    transmision ENUM('automatico', 'manual'),
    kilometraje DECIMAL(10, 2),
    precioDia DECIMAL(10, 2),
    imagen BLOB,
    id_usuario INT, 
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Vehiculos (marca, modelo, transmision, kilometraje, precioDia, imagen) 
VALUES ('Hyundai Tucson', '2021', 'automático', 20.00788, 50.00,imagen);
VALUES ('Hyundai Accent', '2019', 'automático', 18.911, 65.00, imagen);
VALUES ('Hyundai Elantra', '2023', 'automático', 18.730, 35.00, imagen);
VALUES ('Hyundai TSanta Fe', '2022', 'automático', 18.104, 50.00, imagen);
VALUES ('Hyundai Accent Blue', 'automático', 16.411, 35.00, imagen);
VALUES ('Hyundai Creta', 'automático', 14.602, 50.00, imagene);
VALUES ('Hyundai Galloper', 'automático', 14.362, 65.00, imagen);
VALUES ('Hyundai H1', 'automático', 12.888, 50.00, imagen);
VALUES ('Hyundai Grand i10', 'automático', 12.542, 45.00, imagen);
VALUES ('Hyundai Excel', 'automático', 11.542, 50.00, imagen);
VALUES ('Hyundai i10', 'automático', 19.933, 35.00, imagen);
VALUES ('Hyundai Elantra GLS', 'automático', 11.611, 65.00, imagen);

VALUES ('Toyota RAV4', '2019','automático', 19.605, 45.00,imagen);
VALUES ('Toyota Yaris', '2018','automático', 12.201, 50.00, imagen);
VALUES ('Toyota Corolla', '2021','automático',16.211, 40.00, imagen);
VALUES ('Toyota Land Cruiser', '2019','automático', 6.465, 35.00, imagen);
VALUES ('Toyota Echo', '2021','automático', 11.504, 50.00, imagen);
VALUES ('Toyota Land Cruiser Prado', '2018', 'automático', 4.286, 65.00, imagen);
VALUES ('Toyota 4Runner', '2020', 'automático', 14.504, 50.00, imagen);
VALUES ('Toyota Fortuner', '2023','automático', 10.060, 40.00, imagen);
VALUES ('Toyota Tercel', '2022','automático', 17.922, 65.00, imagen);
VALUES ('Toyota HiAce', '2021','automático',23.300, 50.00, imagen);
VALUES ('Toyota Tundra', '2022', 'automático',19.000, 45.00, imagen);
VALUES ('Toyota Rush', '2019','automático', 16.200, 35.00, imagen);
VALUES ('Toyota FJ Cruiser','2021', 'automático', 11.700, 65.00, imagen);

VALUES ('Mitsubishi Montero','2022','automático', 15.285, 40.00, imagen);
VALUES ('Mitsubishi L200', '2021','automático', 10.453, 50.00, imagen);
VALUES ('Mitsubishi TLancer', '2023', 'automático', 19.678, 35.00, imagen);

VALUES ('Honda Civic', '2021','automático', 11.255, 35.00, imagen);
VALUES ('Honda CR-V', '2022', 'automático', 19.625, 50.00, imagen);
VALUES ('Honda Pilot', '2021', 'automático', 23.112, 45.00, imagen);
VALUES ('Honda Accord', '2023', 'automático', 25.456, 40.00,imagen);
VALUES ('Honda Odyssey', '2022', 'automático', 23.567, 50.00, imagen);


VALUES ('Nissan Frontier', '2023', 'automático', 22.453, 50.00, true);
VALUES ('Nissan Pathfinder','2021', 'automático', 20.234, 40.00, true);
VALUES ('Nissan Sentra', '2019', 'automático', 15.678,65.00, true);
VALUES ('Nissan X-Trail', 'automático', 11.567, 35.00, true);
VALUES ('Nissan Xterra', 'automático', 26.780, 45.00, true);
VALUES ('Nissan Navarra', 'automático', 24.456, 65.00, true);
VALUES ('Nissan Qashqai', 'automático', 27.897, 50.00, true);
VALUES ('Nissan Tiida', 'automático', 22.245, 40.00, true);

VALUES ('Kia Sportage', 'automático', 21.278, 35.00, true);
VALUES ('Kia Sorento', 'automático', 19.345, 50.00, true);
VALUES ('Kia Rio', 'automático', 15.245, 65.00, true);
VALUES ('Kia Picanto', 'automático', 25.567, 35.00, true);
VALUES ('Kia Soul', 'automático', 17.324, 50.00, true);
VALUES ('Kia Carnival', 'automático', 25.289, 40.00, true);

VALUES ('Jeep Wrangler', 'automático', 31.672, 65.00, true);
VALUES ('Jeep Grand Cherokee', 'automático', 23.678, 35.00, true);
VALUES ('Suzuki Grand Vitara', 'automático', 22.256, 50.00, true);

VALUES ('Suzuki SideKick', 'automático', 17.345, 50.00, true);
VALUES ('Suzuki Vitara', 'automático', 16.345, 65.00, true);
VALUES ('Suzuki Samurai', 'automático', 18.783, 40.00, true);
VALUES ('Suzuki SX4', 'automático', 18.345, 40.00, true);
VALUES ('Suzuki Aerio', 'automático', 12.784, 50.00, true);
VALUES ('Suzuki S-Presso', 'automático', 18.268, 45.00, true);

VALUES ('Chevrolet Tracker', 'automático', 15.327, 35.00, true);
VALUES ('Chevrolet Spark', 'automático', 19.567, 35.00, true);
VALUES ('Chevrolet Tahoe', 'automático', 12.345, 65.00, true);
VALUES ('Chevrolet Aveo', 'automático', 18.287, 50.00, true);
VALUES ('Chevrolet Camaro', 'automático', 32.345, 40.00, true);
VALUES ('Chevrolet Silverado', 'automático', 25.168, 35.00, true);
VALUES ('Chevrolet S10', 'automático', 22.345, 50.00, true);
VALUES ('Chevrolet Trax', 'automático', 23.124, 40.00, true);

VALUES ('Daihatsu Terios', 'automático', 15.238, 40.00, true);
VALUES ('Daihatsu Sirion', 'automático', 17.381, 50.00, true);

VALUES ('Land Rover Range Rover', 'automático', 23.786, 65.00, true);
VALUES ('Land Rover Defender', 'automático', 22.894, 35.00, true);
VALUES ('Land Rover Range Rover Sport', 'automático', 21.789, 45.00, true);
VALUES ('Land Rover Discovery Sport', 'automático', 23.789, 65.00, true);
VALUES ('Land Rover Range Rover Evoque', 'automático', 25.678, 50.00, true);

VALUES ('Ford Explorer', 'automático', 33.234, 40.00, true);
VALUES ('Ford Ranger', 'automático', 32.278, 35.00, true);
VALUES ('Ford Edge', 'automático', 28.780, 35.00, true);
VALUES ('Ford Escape', 'automático', 18.897, 50.00, true);
VALUES ('Ford F-150', 'automático', 25.678, 65.00, true);
VALUES ('Ford Mustang', 'automático', 21.493, 65.00, true);

VALUES ('Mini Cooper', 'automático', 19.289, 40.00, true);

VALUES ('BMW X5', 'automático', 22.634, 40.00, true);
VALUES ('BMW 325', 'automático', 21.694, 35.00, true);
VALUES ('BMW 320', 'automático', 19.289, 65.00, true);
VALUES ('BMW X3', 'automático', 18.783, 50.00, true);
VALUES ('BMW 323', 'automático', 23.518, 65.00, true);

VALUES ('Renault Duster', 'automático', 19.490, 45.00, true);
VALUES ('Renault Megane', 'automático', 32.634, 50.00, true);

VALUES ('Mazda CX-7', 'automático', 23.678, 65.00, true);
VALUES ('Mazda 3', 'automático', 21.690, 50.00, true);
VALUES ('Mazda BT-50', 'automático', 22.689, 45.00, true);

VALUES ('Mercedes Benz ML', 'automático', 22.690, 45.00, true);
VALUES ('Mercedes Benz 190', 'automático', 32.289, 50.00, true);

VALUES ('Isuzu Rodeo', 'automático', 22.567, 35.00, true);
VALUES ('Isuzu Trooper', 'automático', 22.389, 50.00, true);
VALUES ('Isuzu KB', 'automático', 21.298, 50.00, true);

VALUES ('Fiat 500', 'automático', 17.909, 40.00, true);

VALUES ('Volkswagen Jetta', 'automático', 27.489, 35.00, true);
VALUES ('Volkswagen Amarok', 'automático', 25.780, 50.00, true);
VALUES ('Volkswagen Tiguan', 'automático', 25.286 65.00, true);

VALUES ('Peugeot 206', 'automático', 19.295, 35.00, true);
VALUES ('Peugeot 307', 'automático', 16.345, 40.00, true);

VALUES ('Subaru Impreza WRX', 'automático', 22.678, 45.00, true);

VALUES ('Hummer H3', 'automático', 18.743, 45.00, true);

VALUES ('Lexus NX 300h', 'automático', 15.734, 50.00, true);

VALUES ('Audi Q5', 'automático', 17.634, 65.00, true);




SELECT * FROM Vehiculos;

CREATE TABLE Datos_Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    cedula VARCHAR(50),
    edad INT,
    correo VARCHAR(255),
    imagen LONGBLOB
);

SELECT * FROM Datos_Usuarios;

CREATE TABLE Reservar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreCliente VARCHAR(255),
    cantidadDias INT,
    fechaInicial DATE,
    fechaFinal DATE,
    id_vehiculo INT,
    FOREIGN KEY (id_vehiculo) REFERENCES Vehiculos(id),
     correo_usuario VARCHAR(255), 
    FOREIGN KEY (correo_usuario) REFERENCES Registro(correo)
);

SELECT * FROM Reservar;

CREATE TABLE Devolver (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    hora TIME,
    lugar VARCHAR(255),
    id_reserva INT,
    FOREIGN KEY (id_reserva) REFERENCES Reservar(id)
);

SELECT * FROM Devolver;

CREATE TABLE Contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    correo VARCHAR(255),
    mensaje TEXT,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM Contacto;