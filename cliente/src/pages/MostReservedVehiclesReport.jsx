// Componente para mostrar los vehículos más reservados
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MostReservedVehiclesReport.css';

const MostReservedVehiclesReport = () => {
  const [mostReservedVehicles, setMostReservedVehicles] = useState([]);

  useEffect(() => {
    const fetchMostReservedVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reportes/vehiculos-mas-reservados');
        setMostReservedVehicles(response.data);
      } catch (error) {
        console.error('Error fetching most reserved vehicles', error);
      }
    };

    fetchMostReservedVehicles();
  }, []);

  return (
    <div>
      <h2>Vehículos más reservados</h2>
      <ul>
        {mostReservedVehicles.map((vehicle, index) => (
          <li key={index}>{vehicle._id} - {vehicle.count} reservas</li>
        ))}
      </ul>
    </div>
  );
};

export default MostReservedVehiclesReport;
