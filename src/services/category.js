import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const AllProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Aquí debes realizar la lógica para obtener todos los productos, por ejemplo, mediante una API o desde alguna fuente de datos
    // Supongamos que obtienes la lista de productos y la guardas en 'products'
    const productsFromAPI = [
      { id: 1, name: 'Producto 1', price: 19.99 },
      { id: 2, name: 'Producto 2', price: 29.99 },
      // ... otros productos
    ];
    setProducts(productsFromAPI);
  }, []);

  const handleProductPress = (productId) => {
    // Lógica para manejar la navegación a la vista de detalles del producto
    navigation.navigate('ProductDetails', { productId });
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => handleProductPress(item.id)}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Precio: ${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#666666',
  },
});

export default AllProducts;
