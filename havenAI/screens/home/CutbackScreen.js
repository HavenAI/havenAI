import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RecommendedSection from '../../components/RecommendedSection';

export default function CutbackScreen() {
  // You can adjust the number of days based on your actual data
  const daysAgo = 20;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.infoText}>You started cutting back</Text>
        
        <View style={styles.counterContainer}>
          <Text style={styles.counterNumber}>{daysAgo}</Text>
          <Text style={styles.counterLabel}>days ago</Text>
        </View>
        
        <View style={styles.dotIndicator}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
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
    fontFamily: 'Poppins-Bold',
    fontSize: 80,
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
