import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, TouchableWithoutFeedback } from 'react-native';
import RecommendedSection from '../../../components/RecommendedSection';
import { useUser } from '../../../context/UserContext';

export default function SessionsScreen() {
  // Maximum baseline for all bars
  const MAX_BASELINE = 20;
    // Get shared state from context
  const { 
    sessionsData, 
    setSessionsData,
    cutbackDays,
    setCutbackDays,
    filledDays,
    setFilledDays
  } = useUser();
  
  // Get current date information
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Convert Sunday (0) to index 6, and shift Monday to index 0
  const getCurrentDayIndex = () => {
    return currentDay === 0 ? 6 : currentDay - 1;
  };
  const currentDayIndex = getCurrentDayIndex();
  
  // Helper function to check if a day is accessible (past or current)
  const isDayAccessible = (dayIndex) => {
    return dayIndex <= currentDayIndex; // Only past and current days
  };
  
  // Track interaction states
  const [activeBarIndex, setActiveBarIndex] = useState(null);
  const [startY, setStartY] = useState(0);

  const renderBar = (item, index) => {
    const isCurrentDay = index === currentDayIndex;
    const isAccessible = isDayAccessible(index); // Past or current days only
    const isFutureDay = index > currentDayIndex;
    
    // Calculate bar height as a percentage of the maximum
    const barHeight = (item.count / MAX_BASELINE) * 100;
    
    // Create pan responder for simple swipe up interaction
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => isAccessible,
      onMoveShouldSetPanResponder: () => isAccessible,
      
      onPanResponderGrant: (evt, gestureState) => {
        if (!isAccessible) return;
        setActiveBarIndex(index);
        setStartY(gestureState.y0);
      },
      
      onPanResponderMove: (evt, gestureState) => {
        if (!isAccessible) return;
        
        // Calculate new value based on vertical swipe (like filling a cup)
        const deltaY = startY - gestureState.moveY;
        const sensitivity = 5; // Adjust sensitivity for filling effect
        
        // Calculate new count value (0-20 range)
        let newValue = Math.max(0, Math.min(
          Math.floor(deltaY / sensitivity),
          MAX_BASELINE
        ));
        
        const prevValue = sessionsData[index].count;
        const dayKey = `day-${index}`;
        
        // Update the count for this specific bar
        setSessionsData(prevData => 
          prevData.map((dataItem, dataIndex) => 
            dataIndex === index ? { ...dataItem, count: newValue } : dataItem
          )
        );
        
        // If this is the first time filling this day's session AND it's not fully filled to baseline,
        // increment cutback days
        if (prevValue === 0 && newValue > 0 && newValue < MAX_BASELINE && !filledDays.includes(dayKey)) {
          setCutbackDays(prev => prev + 1);
          setFilledDays(prev => [...prev, dayKey]);
        }
      },
      
      onPanResponderRelease: () => {
        setActiveBarIndex(null);
      },
      
      onPanResponderTerminate: () => {
        setActiveBarIndex(null);
      },
    });
    
    return (
      <View key={index} style={styles.barContainer} {...(isAccessible ? panResponder.panHandlers : {})}>
        <View style={styles.barWrapper}>
          {/* Display the count value on top of the bar */}
          {item.count > 0 && (
            <Text style={styles.valueText}>{item.count}</Text>
          )}
          
          {/* Background bar (always visible) */}
          <View 
            style={[
              styles.backgroundBar, 
              { opacity: isFutureDay ? 0.5 : 1 }
            ]} 
          />
          
          {/* Filled portion of the bar */}
          <View 
            style={[
              styles.filledBar, 
              { 
                height: `${Math.max(barHeight, 0)}%`,
                backgroundColor: '#8AF0DC',
                opacity: isFutureDay ? 0.3 : 1
              }
            ]} 
          />
        </View>
        
        <Text 
          style={[
            styles.dayLabel, 
            { 
              color: isCurrentDay ? '#8AF0DC' : '#FFFFFF',
              opacity: isFutureDay ? 0.4 : 1
            }
          ]}
        >
          {item.day}
        </Text>
      </View>
    );
  };

  // Initialize session data if it doesn't exist
  useEffect(() => {
    if (!sessionsData || sessionsData.length === 0) {
      const initialData = [
        { day: 'M', count: 15 },
        { day: 'T', count: 12 },
        { day: 'W', count: 10 },
        { day: 'T', count: 13 },
        { day: 'F', count: 10 },
        { day: 'S', count: 7 },
        { day: 'S', count: 5 }
      ];
      setSessionsData(initialData);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Vape Sessions per Day</Text>
        
        <View style={styles.chartContainer}>
          <View style={styles.barsContainer}>
            {sessionsData && sessionsData.map((item, index) => renderBar(item, index))}
          </View>
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
  },
  titleText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
    marginTop: 5
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 250,
    marginBottom: 5,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    paddingBottom: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    width: 30,
    height: 200,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  backgroundBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#1C454F',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  filledBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#8AF0DC',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    zIndex: 1,
  },
  valueText: {
    position: 'absolute',
    top: -25,
    width: '100%',
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    zIndex: 2,
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
