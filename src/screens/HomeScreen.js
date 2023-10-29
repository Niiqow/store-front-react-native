import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel from './Carousel'; // Importa el componente del carrusel

const HomeScreen = ({ navigation }) => {
  const navigateToProducts = () => {
    navigation.navigate('Productos'); // Reemplaza 'Productos' con el nombre de tu pantalla de productos
  };

  // Suponiendo que imageArray contiene las rutas de tus imágenes
  const imageArray = [
    require('../assets/img/imagen1.jpg'),
    require('../assets/img/imagen2.jpg'),
    require('../assets/img/imagen3.jpg'),
    // ... y así sucesivamente
  ];

  return (
    <View style={styles.container}>
      <Carousel images={imageArray} />

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>¡Bienvenido a Nuestra Tienda!</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={navigateToProducts}>
          <Text style={styles.buttonText}>Ver Productos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Color de fondo (puedes cambiarlo según tu preferencia)
  },
  content: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    textShadowColor: '#BBB',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: '#689F38',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
