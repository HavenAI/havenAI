import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

import xmark from '../../assets/xmark.png';
import playIcon from '../../assets/play.png';
import pauseIcon from '../../assets/pause.png';
import wave from '../../assets/wave.png';

export default function MeditationScreen() {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const togglePlay = async () => {
    if (isPlaying) {
      if (sound) {
        await sound.pauseAsync();
      }
      setIsPlaying(false);
    } else {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require('../../assets/audio/calm.mp3')
        );
        setSound(newSound);
        await newSound.playAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(true);
    }
  };
  
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <LinearGradient
      colors={['#ACC8C3', '#276270']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" backgroundColor="#276270" />

      {/* Close */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Image source={xmark} style={styles.icon} />
      </TouchableOpacity>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Meditation</Text>
        <Text style={styles.subtitle}>Press play to center yourself.</Text>

        {/* Image or Dots */}
        <View style={styles.imageContainer}>
        {isPlaying ? (
            <Image source={wave} style={styles.waveImage} resizeMode="contain" />
        ) : (
            <Text style={styles.dots}>.....</Text>
        )}
        </View>


        {/* Play/Pause */}
        <TouchableOpacity onPress={togglePlay} style={styles.circleButton}>
          <Image source={isPlaying ? pauseIcon : playIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
  card: {
    width: 340,
    height: 330,
    borderRadius: 20,
    backgroundColor: 'rgba(250, 244, 239, 0.1)',
  
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    fontSize: 32,
    fontFamily: 'Poppins',
    color: '#FAF4EF',
    letterSpacing: 4,
  },  
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#FAF4EF',
    textAlign: 'center',
  },
  waveImage: {
    width: 140,
    height: 60,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FAF4EF40',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
