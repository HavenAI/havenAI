import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function BreathingCompleteScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#B5A9DD', '#62569A']} style={styles.gradient}>
      <Text style={styles.title}>Exercise Complete</Text>
      <Text style={styles.subtitle}>Great job on your breathwork.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Self-Care')}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#EFECEC',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FAF4EF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  buttonText: {
    color: '#5B4E8D',
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
});
