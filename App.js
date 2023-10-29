import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetails from './src/screens/ProductDetails';
import { TouchableOpacity, LogBox } from 'react-native'; // Importa LogBox desde 'react-native'
import { Icon } from 'react-native-elements';
import MenuOptions from './src/screens/MenuOptions';
import ProductScreen from './src/screens/ProductScreen';
import AdminPanel from './src/screens/AdminPanel';
import ProductAdmin from './src/screens/ProductAdmin';
import EditProduct from './src/screens/EditProduct';
import CustomLoadingIndicator from './src/screens/CustomLoadingIndicator';
import NewProduct from './src/screens/NewProduct';

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']); // Ignora la advertencia específica

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: 'Inicio',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('MenuOptions')} style={{ marginRight: 15 }}>
                <Icon name="menu" type="material" size={30} color="#333" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Productos"
          component={ProductScreen}
          options={({ navigation }) => ({
            headerTitle: 'Productos',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('MenuOptions')} style={{ marginRight: 15 }}>
                <Icon name="menu" type="material" size={30} color="#333" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={({ navigation }) => ({
            headerTitle: 'Tienda',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('MenuOptions')} style={{ marginRight: 15 }}>
                <Icon name="menu" type="material" size={30} color="#333" />
              </TouchableOpacity>
            ),
          })}
        />

      <Stack.Screen
          name="ProductAdmin"
          component={ProductAdmin}
          options={({ navigation }) => ({
            headerTitle: 'ProductAdmin',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('NewProduct')} style={{ marginRight: 15 }}>
                <Icon name="add" type="material" size={30} color="#333" />
              </TouchableOpacity>
            ),
          })}
        />

    
        <Stack.Screen name="AdminPanel" component={AdminPanel} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
        <Stack.Screen name="NewProduct" component={NewProduct} />
        <Stack.Screen name="MenuOptions" component={MenuOptions} />
        <Stack.Screen name="CustomLoadingIndicator" component={CustomLoadingIndicator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
