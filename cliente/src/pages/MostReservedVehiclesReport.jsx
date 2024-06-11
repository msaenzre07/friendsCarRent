import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
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
  

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Vehículos más reservados</Text>
          <View style={styles.vehicleList}>
            {mostReservedVehicles.map((vehicle, index) => (
              <Text key={index} style={styles.vehicleItem}>
                {vehicle._id} - {vehicle.count} reservas
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    vehicleList: {
      fontSize: 16,
    },
    vehicleItem: {
      marginBottom: 5,
    },
  });

  return (
    <div className="report-container">
      <h2 className="report-title">Vehículos más reservados</h2>
      <ul className="vehicle-list">
        {mostReservedVehicles.map((vehicle, index) => (
          <li key={index} className="vehicle-item">
            <span className="vehicle-name">{vehicle._id}</span> - <span className="reservations-count">{vehicle.count} reservas</span>
          </li>
        ))}
      </ul>
      <PDFDownloadLink document={<MyDocument />} fileName="most_reserved_vehicles_report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Cargando documento...' : 'Descargar PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default MostReservedVehiclesReport;
