import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import xmark from '../../assets/xmark.png';

export default function ReflectionScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#F7B3B1', '#F37754']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" backgroundColor="#F37754" />

      <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.closeButton}
            >
            <Image source={xmark} style={styles.closeIcon} />
            </TouchableOpacity>

      <View style={styles.wrapper}>
        <Text style={styles.title}>Let’s take a moment to reflect on your progress</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Remember Your Why</Text>
          <Text style={styles.cardSubtitle}>
            Here’s what you wrote when you started your journey.
          </Text>
          <Text style={styles.quote}>
            “I want to be free from{"\n"}cravings and proud of how{"\n"}far I’ve come.”
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Talk');}}>
            <Text style={styles.buttonText}>Open Reflection Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: 376,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: -80,
  },
  title: {
    fontSize: 20,
    color: '#FAF4EF',
    fontFamily: 'Poppins',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: '#FAF4EF',
  },  
  card: {
    width: 376,
    height: 486,
    borderRadius: 32,
    backgroundColor: '#3A3A3A40',
    paddingVertical: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    fontFamily: 'Poppins',
    marginBottom: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#FAF4EF',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 20,
  },
  quote: {
    fontSize: 20,
    color: '#FAF4EF',
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '600'

  },
  button: {
    width: 220,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FF875B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#FAF4EF',

  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#F37754',
    fontWeight: '600',
  },
});
