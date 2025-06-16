import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RecommendedSection from '../../../components/RecommendedSection';
import { useUser } from '../../../context/UserContext';

export default function CutbackScreen() {
  // Get dynamic cutback days from context
  const { cutbackDays } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.infoText}>You started cutting back</Text>
        
        <View style={styles.counterContainer}>
          <Text style={styles.counterNumber}>{cutbackDays}</Text>
          <Text style={styles.counterLabel}>days ago</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A6D74',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  counterContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  counterNumber: {
    color: '#8AF0DC',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 120,
    lineHeight: 130,
  },
  counterLabel: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 20,
    marginTop: -5,
  },
  dotIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
});
