import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import background from './assets/background.png';
import {useFonts} from 'expo-font';
import WelcomeScreen from './components/WelcomeScreen.js';
import Navigation from './navigation/Navigation.js';
import { UserProvider } from './context/UserContext.js';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
});
