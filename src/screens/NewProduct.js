import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { ActivityIndicator } from 'react-native';
import CustomLoadingIndicator from './CustomLoadingIndicator'; // Asegúrate de que la ruta sea correcta

const NewProduct = () => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleCreateProduct = async () => {
    try {
      setLoading(true);
      const newProduct = {
        name,
        price: parseFloat(price),
        description,
        stock: parseInt(stock),
        imageUrl,
        category: selectedCategory,
      };

      const response = await fetch('http://192.168.1.183:3000/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      navigation.goBack(); // Redirigir a la pantalla anterior
    } catch (error) {
      console.error('Error al crear el producto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.title}>Nuevo Producto</Text>
          <View style={styles.inputContainer}>
            <FormField
              label="Nombre del producto"
              value={name}
              onChangeText={setName}
              placeholder="Nombre del producto"
            />
            <FormField
              label="Precio"
              value={price}
              onChangeText={setPrice}
              placeholder="Precio"
              keyboardType="numeric"
            />
            <FormField
              label="Stock"
              value={stock}
              onChangeText={setStock}
              placeholder="Stock"
              keyboardType="numeric"
            />
            <FormField
              label="URL de la imagen"
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="URL de la imagen"
            />
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Categoría</Text>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                style={{ marginTop: -20, marginBottom: -20 }}
              >
                {categories.map((category) => (
                  <Picker.Item
                    key={category._id}
                    label={category.name}
                    value={category._id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Descripción"
                multiline
                numberOfLines={10}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Crear Producto"
              onPress={handleCreateProduct}
              color="#fff"
            />
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const FormField = ({ label, ...rest }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} {...rest} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  updateButton: {
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  descriptionContainer: {
    marginBottom: 15,
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  categoryButtonContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#689F38',
  
    borderRadius: 50,
    marginBottom: 20,

  }
});

export default NewProduct;