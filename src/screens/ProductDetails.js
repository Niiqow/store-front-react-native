import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import CustomLoadingIndicator from './CustomLoadingIndicator';

const ProductDetails = ({ route }) => {
  const { productId } = route.params; // Obtiene solo el ID del producto
  const [product, setProduct] = useState(null);
  const [quantityToBuy, setQuantityToBuy] = useState(1);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantityToBuy + amount;
    if (newQuantity > 0 && newQuantity <= (product ? product.stock : 0)) {
      setQuantityToBuy(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Lógica para agregar la cantidad seleccionada del producto al carrito
    // ...
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.183:3000/products/details/${productId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del producto');
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return (
      <CustomLoadingIndicator />
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>Precio: ${product.price}</Text>
        <Text style={styles.productQuantity}>Cantidad disponible: {product.stock}</Text>
        <View style={styles.quantitySelector}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(-1)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantityToBuy}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(1)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Icon name="cart-plus" type="font-awesome-5" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5', // Color de fondo gris suave
    padding: 20,
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333', // Color de texto negro
  },
  productPrice: {
    fontSize: 18,
    color: '#666666', // Color de texto gris medio
    marginBottom: 10,
  },
  productQuantity: {
    fontSize: 16,
    color: '#666666', // Color de texto gris medio
    marginBottom: 10,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#689F38', // Color del botón
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF', // Color del texto blanco
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    color: '#666666', // Color de texto gris medio
  },
  addButton: {
    backgroundColor: '#689F38', // Color del botón
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginTop: 30,
    fontSize: 16,
    color: '#666666', // Color de texto gris medio
    textAlign: 'justify',
    paddingHorizontal: 20,
  },
});

export default ProductDetails;
