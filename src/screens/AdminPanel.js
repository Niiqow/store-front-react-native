import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AdminPanel = ({ navigation }) => {
  const handleUsers = () => {
    // Lógica para manejar la navegación a la sección de usuarios
    navigation.navigate('Users');
  };

  const handleProductAdmin = () => {
    // Lógica para manejar la navegación a la sección de productos
    navigation.navigate('ProductAdmin');
  };

  const handleHistory = () => {
    // Lógica para manejar la navegación a la sección de productos
    navigation.navigate('History');
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonUsers} onPress={handleUsers}>
        <Text style={styles.buttonText}>Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonProducts} onPress={handleProductAdmin}>
        <Text style={styles.buttonText}>Productos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonHistory} onPress={handleHistory}>
        <Text style={styles.buttonText}>Historial</Text>
      </TouchableOpacity>
    </View>
  );
};

const buttonCommon = {
  backgroundColor: '#689F38',
  padding: 20,
  borderRadius: 50,
  marginBottom: 20,
  width: 200,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonUsers: {
    ...buttonCommon,
  },
  buttonProducts: {
    ...buttonCommon,
  },
  buttonHistory: {
    ...buttonCommon,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AdminPanel;
