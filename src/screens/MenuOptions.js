import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuOptions = ({ navigation }) => {
  const handleOptionSelect = (option) => {
    // Utiliza la navegación para redirigir a diferentes pantallas según la opción seleccionada
    switch (option) {
      case 'option_1':
        navigation.navigate('Productos'); // Redirige a   ProductScreen
        break;
      case 'option_2':
        navigation.navigate('AdminPanel'); // Reemplaza 'ScreenName2' por el nombre de tu pantalla de destino
        break;
      case 'Opción 3':
        navigation.navigate('ScreenName3'); // Reemplaza 'ScreenName3' por el nombre de tu pantalla de destino
        break;
      default:
        // Acción por defecto
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleOptionSelect('option_1')} style={styles.menuButton}>
        <Text style={styles.menuText}>Productos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOptionSelect('option_2')} style={styles.menuButton}>
        <Text style={styles.menuText}>AdminPanel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOptionSelect('Opción 3')} style={styles.menuButton}>
        <Text style={styles.menuText}>Opción 3</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  menuButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    width: '100%',
  },
  menuText: {
    fontSize: 20,
    color: '#333333',
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default MenuOptions;
