import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomTabBar from '../../components/common/BottomTabBar.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors.js';
import { useNavigation } from '@react-navigation/native';


export default function SelfCareScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [activeBottomTab, setActiveBottomTab] = useState('Self-Care');

  const handlePress = (exercise) => {
    switch (exercise) {
      case 'Meditation':
        navigation.navigate('Meditation');
        break;
      case 'Breathing':
        navigation.navigate('Breathing');
        break;
      case 'Reflection':
        navigation.navigate('Reflection');
        break;
      default:
        Alert.alert(`You tapped: ${exercise}`);
    }
  };
  
  

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.textPrimary} />

      {/* Header Bar */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>Self-Care</Text>
      </View>

      <View style={styles.container}>
      <Text style={styles.extext}>Exercises</Text>
        <View style={styles.cardsWrapper}>
          <TouchableOpacity onPress={() => handlePress('Meditation')}>
            <LinearGradient
              colors={['#ACC8C3', '#276270']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Text style={styles.cardText}>Practice Meditation</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePress('Breathing')}>
            <LinearGradient
              colors={['#CBCEEB', '#5B6199']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Text style={styles.cardText}>Breathing Techniques</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePress('Reflection')}>
            <LinearGradient
              colors={['#D8A7B1', '#FF875B']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Text style={styles.cardText}>Reflection</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <BottomTabBar activeBottomTab={activeBottomTab} setActiveBottomTab={setActiveBottomTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.neutral,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textPrimary,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: COLORS.white,
    textAlign: 'center',
    flex: 1,
  },
  extext: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: COLORS.textPrimary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 24,
    backgroundColor: COLORS.neutral,
  },
  cardsWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    height: 136,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  cardText: {
    fontSize: 22,
    fontFamily: 'Poppins',
    color: '#FAF4EF',
    fontWeight: '600',
    textAlign: 'center',
  },
});
