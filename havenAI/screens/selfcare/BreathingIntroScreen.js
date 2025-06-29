import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import xmark from '../../assets/xmark.png';

export default function BreathingIntroScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#B5A9DD', '#62569A']}
      style={styles.gradient}
    >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                <Image source={xmark} style={styles.closeIcon} />
              </TouchableOpacity>
      <View style={styles.circle}>
        <View style={styles.innerCircle}>
          <Text style={styles.inhaleText}>Inhale</Text>
          <Text style={styles.subText}>Nose</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Focus Breathing</Text>
        <Text style={styles.cardDescription}>
          A technique used to help you center your mind by focusing on your breath. This can help you relax, reduce stress, and improve your overall well-being.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BreathingStart')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 60,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#8B80BA',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#524A7B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inhaleText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  subText: {
    color: '#D5D0EA',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#7D73A1',
    borderRadius: 20,
    padding: 20,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    color: '#FAF4EF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 14,
    fontFamily: 'Poppins',
  },
  cardDescription: {
    color: '#FAF4EF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Poppins',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#FAF4EF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#5B4E8D',
    fontWeight: '400',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
});
