import { StyleSheet} from 'react-native';
import {useFonts} from 'expo-font';
import Navigation from './navigation/Navigation.js';
import { UserProvider } from './context/UserContext.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <UserProvider>
        <Navigation />
        <Toast/>
      </UserProvider>
    </SafeAreaProvider>
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
