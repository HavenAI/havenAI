import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RecommendedSection from '../../components/RecommendedSection';

export default function SummaryScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.infoText}>You've been nicotine free for</Text>
        
        <View style={styles.counterContainer}>
          <Text style={styles.counterNumber}>10</Text>
          <Text style={styles.counterLabel}>days</Text>
        </View>
        
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        
        <View style={styles.dotIndicator}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      
      <RecommendedSection />
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  infoText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  counterContainer: {
    alignItems: 'center',
  },
  counterNumber: {
    color: '#66CDAA',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 120,
    lineHeight: 130,
  },
  counterLabel: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 18,
    marginTop: -5,
  },
  resetButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 15,
  },
  resetButtonText: {
    color: '#1D3557',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  dotIndicator: {
    flexDirection: 'row',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
});
