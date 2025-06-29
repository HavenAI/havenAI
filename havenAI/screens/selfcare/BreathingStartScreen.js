import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import xmark from '../../assets/xmark.png';

export default function BreathingStartScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#B5A9DD', '#62569A']} style={styles.gradient}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Image source={xmark} style={styles.closeIcon} />
            </TouchableOpacity>
      <View style={styles.circleOuter}>
        <View style={styles.circleInner}>
          <Text style={styles.label}>Inhale</Text>
          <Text style={styles.subLabel}>Nose</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BreathingProgress')}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
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
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
  },
  circleOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#8B80BA',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  circleInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#524A7B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  subLabel: {
    color: '#D5D0EA',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#FAF4EF',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: {
    color: '#5B4E8D',
    fontWeight: '400',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
});
