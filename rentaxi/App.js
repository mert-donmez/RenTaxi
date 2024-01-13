import react,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartAppScreen from './components/StartAppScreen';
import RegisterScreen from './components/RegisterScreen';
import DriverScreen from './components/DriverScreen';
import { GlobalProvider } from './context/GlobalContext';
import LoginScreen from './components/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <GlobalProvider>
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Start" component={StartAppScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Driver" component={DriverScreen} />
    </Stack.Navigator>
  </NavigationContainer>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
