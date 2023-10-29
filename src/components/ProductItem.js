import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const ProductDetails = ({ route }) => {
  const { product } = route.params;

  const handleAddToCart = () => {
    // Lógica para agregar el producto al carrito
    // ...
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>Precio: ${product.price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Icon name="cart-plus" type="font-awesome-5" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5', // Color gris suave
  },
  productImage: {
    width: 300,
    height: 300,
    marginBottom: 15,
    borderRadius: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333', // Color negro
  },
  productPrice: {
    fontSize: 18,
    color: '#666666', // Color gris medio
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FFA500', // Color naranja
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Color blanco
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default ProductDetails;
