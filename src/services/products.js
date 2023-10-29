import axios from 'axios';

// Función para obtener datos de la API
const getAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/products/list'); // Reemplaza con la URL de tu API
    return response.data; // Aquí se obtienen los datos de la respuesta
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null;
  }
};

// Llamada a la función para obtener los datos
getAllProducts()
  .then(data => {
    if (data) {
      // Realizar acciones con los datos obtenidos
      console.log('Datos obtenidos:', data);
    }
  });
