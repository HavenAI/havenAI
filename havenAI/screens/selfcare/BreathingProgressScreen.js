import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions , Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import xmark from '../../assets/xmark.png';

const { width } = Dimensions.get('window');

export default function BreathingProgressScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const scale = useRef(new Animated.Value(1)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const TOTAL_STEPS = 8;

  const startBreathing = () => {
    animateStep();
  };

  const animateStep = () => {
    if (currentStep >= TOTAL_STEPS) {
      setTimeout(() => navigation.navigate('BreathingComplete'), 1000);
      return;
    }

    // Animate circle
    Animated.timing(scale, {
      toValue: currentStep % 2 === 0 ? 1.4 : 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();

    // Animate progress bar
    Animated.timing(progress, {
      toValue: (currentStep + 1) / TOTAL_STEPS,
      duration: 4000,
      useNativeDriver: false,
    }).start();

    // Wait for 4 seconds then go to next step
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 4000);
  };

  useEffect(() => {
    startBreathing();
  }, [currentStep]);

  return (
    <LinearGradient colors={['#B5A9DD', '#62569A']} style={styles.gradient}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Image source={xmark} style={styles.closeIcon} />
            </TouchableOpacity>
      <Animated.View style={[styles.outerCircle, { transform: [{ scale }] }]}>
        <View style={styles.innerCircle}>
          <Text style={styles.label}>{currentStep % 2 === 0 ? 'Inhale' : 'Exhale'}</Text>
          <Text style={styles.subLabel}>Nose</Text>
        </View>
      </Animated.View>

      <View style={styles.progressWrapper}>
        <Animated.View
          style={[styles.progressBar, {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            })
          }]}
        />
      </View>

      <TouchableOpacity style={styles.pauseButton} onPress={() => navigation.goBack()}>
        <Text style={styles.pauseText}>Pause</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#8B80BA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#524A7B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  subLabel: {
    color: '#D5D0EA',
    fontSize: 12,
  },
  progressWrapper: {
    height: 10,
    width: width * 0.8,
    backgroundColor: '#A79EC9',
    borderRadius: 5,
    marginTop: 32,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3C3663',
    borderRadius: 5,
  },
  pauseButton: {
    marginTop: 24,
    backgroundColor: '#FAF4EF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  pauseText: {
    color: '#5B4E8D',
    fontWeight: '400',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
});
