import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import CustomLoadingIndicator from './CustomLoadingIndicator';

const ProductScreen = ({ navigation }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const responseCategories = await fetch('http://192.168.1.183:3000/category/list');
        if (!responseCategories.ok) {
          throw new Error('Error al obtener las categorías');
        }

        const categoriesData = await responseCategories.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }

      try {
        const responseProducts = await fetch('http://192.168.1.183:3000/products/list');
        if (!responseProducts.ok) {
          throw new Error('Error al obtener los datos');
        }

        const productsData = await responseProducts.json();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la información:', error);
        setLoading(false);
      }
    };

    fetchData();
    
  }, []);

  const renderProductItem = ({ item }) => {
    if (item.stock !== 0) {
      return (
        <Card containerStyle={styles.card}>
          <TouchableOpacity onPress={() => navigateToProduct(item)}>
            <View style={styles.imageContainer}>
              <Card.Image
                source={{ uri: item.imageUrl }}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>Precio: ${item.price}</Text>
          <Button
            title="Agregar al carrito"
            buttonStyle={styles.addButton}
            titleStyle={styles.buttonText}
          />
        </Card>
      );
    } else {
      // Si el stock es 0, no se renderiza nada
      return null;
    }
  };
  
  const navigateToProduct = (product) => {
    setSelectedProduct(product);
    navigation.navigate('ProductDetails', { productId: product._id });
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

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

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categoryContainer}>
        <View style={styles.categoryButtonContainer}>
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
          <View key={index} style={styles.categoryButtonContainer}>
            {renderCategoryButton(category)}
          </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginBottom: -10,
  },
  categoryButtonContainer: {
    marginHorizontal: 5,
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#689F38',
    marginBottom: 10,
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedCategoryButton: {
    backgroundColor: '#689F38',
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
  },
  productList: {
    paddingHorizontal: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageContainer: {
    height: 400,
    overflow: 'hidden',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333333',
  },
  productPrice: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#689F38',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

export default ProductScreen;
