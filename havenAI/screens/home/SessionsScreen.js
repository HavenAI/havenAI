import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RecommendedSection from '../../components/RecommendedSection';

export default function SessionsScreen() {
  // Sample data for the sessions per day (corresponding to the second image)
  const sessionsData = [
    { day: 'M', count: 15 },
    { day: 'T', count: 12 },
    { day: 'W', count: 10 },
    { day: 'T', count: 13 },
    { day: 'F', count: 10 },
    { day: 'S', count: 7 },
    { day: 'S', count: 5 }
  ];
  
  // Find the maximum count for scaling the bars
  const maxCount = Math.max(...sessionsData.map(item => item.count));
  
  // Current day's highlight (assuming 'S' is the current day based on the image)
  const currentDayIndex = 6; // Sunday (last bar in the image)

  const renderBar = (item, index) => {
    // Calculate bar height as a percentage of the maximum
    const barHeight = (item.count / maxCount) * 100;
    const isCurrentDay = index === currentDayIndex;
    
    return (
      <View key={index} style={styles.barContainer}>
        <View style={styles.barWrapper}>
          <View 
            style={[
              styles.bar, 
              { height: `${barHeight}%` },
              isCurrentDay && styles.currentDayBar
            ]} 
          />
          {isCurrentDay && (
            <View style={styles.currentDayIndicator}>
              <Text style={styles.currentDayText}>C</Text>
            </View>
          )}
        </View>
        <Text style={styles.dayLabel}>{item.day}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Vape Sessions per Day</Text>
        
        <View style={styles.chartContainer}>
          <View style={styles.barsContainer}>
            {sessionsData.map((item, index) => renderBar(item, index))}
          </View>
        </View>
        
        <View style={styles.dotIndicator}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
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
  },
  titleText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    maxHeight: 250,
    marginBottom: 30,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    paddingBottom: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    width: 30,
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  bar: {
    width: '100%',
    backgroundColor: '#8AF0DC', // Light teal color for bars
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  currentDayBar: {
    backgroundColor: '#8AF0DC', // Same color as others since the circle will be purple
  },
  currentDayIndicator: {
    position: 'absolute',
    top: -15, 
    right: -10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#C270E0', // Purple color for the circle
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  currentDayText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  dayLabel: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: 8,
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
