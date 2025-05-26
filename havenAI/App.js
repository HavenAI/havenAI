import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import background from './assets/background.png';
import{useFonts} from 'expo-font';
import COLORS from './constants/colors.js';
import TYPOGRAPHY from './constants/typography.js';
import WelcomeScreen from './components/WelcomeScreen.js';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <WelcomeScreen/>
        <TouchableOpacity style={styles.button}>
          <Text style={TYPOGRAPHY.buttonText}>Continue</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
    </View>
  </ImageBackground>
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
  button: {
    width: 125,
    height: 48,
    backgroundColor: COLORS.neutral,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginTop: 40,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#276270',
    
  },
});
