import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomLoadingIndicator from './CustomLoadingIndicator';

const ProductAdmin = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const refreshProducts = useCallback(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.183:3000/products/list');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const responseData = await response.json();
        setProducts(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la información:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://192.168.1.183:3000/category/list');
        if (!response.ok) {
          throw new Error('Error al obtener las categorías');
        }

        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
    refreshProducts();

    const unsubscribe = navigation.addListener('focus', () => {
      refreshProducts();
    });

    return unsubscribe;
  }, [navigation, refreshProducts]);

  const handleProductEdit = (productId) => {
    navigation.navigate('EditProduct', { productId });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductEdit(item._id)}>
      <View style={styles.card}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDetails}>Precio: ${item.price}</Text>
        {item.stock === 0 ? (
          <Text style={styles.outOfStock}>Agotado</Text>
        ) : (
          <Text style={styles.stock}>Stock: {item.stock}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category._id ? styles.selectedCategoryButton : null,
      ]}
      onPress={() => handleCategorySelection(category._id)}
    >
      <Text style={styles.categoryButtonText}>{category.name}</Text>
    </TouchableOpacity>
  );

  const handleCategorySelection = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <View style={styles.container}>
    <View style={styles.categoryContainer}>
      <View style={[styles.categoryButtonContainer, styles.allButtonContainer]}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === null ? styles.selectedCategoryButton : null,
            styles.allButton,
          ]}
          onPress={() => handleCategorySelection(null)}
        >
          <Text style={styles.categoryButtonText}>Todos</Text>
        </TouchableOpacity>
      </View>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryButtonContainer}>
          {renderCategoryButton(category)}
        </TouchableOpacity>
      ))}
    </View>

    {loading ? (
      <CustomLoadingIndicator />
    ) : (
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.productList}
      />
    )}
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    padding: 20,
    marginBottom: 10,
    width: '100%',
  },
  productList: {
    paddingHorizontal: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  categoryButtonContainer: {
    marginHorizontal: 5,
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#347235',
    marginBottom: 10,
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedCategoryButton: {
    backgroundColor: '#347235',
  },
  allButton: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  stock: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  outOfStock: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default ProductAdmin;
