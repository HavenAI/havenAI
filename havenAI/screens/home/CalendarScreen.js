import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RecommendedSection from '../../components/RecommendedSection';

export default function CalendarScreen() {
  // Calendar data for May 2025
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const weeks = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, null, null, null, null, null]
  ];
  
  // Current selected days - multiple selection to match reference image
  const [selectedDays, setSelectedDays] = useState([15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
  
  // Handle day selection
  const handleDayPress = (day) => {
    if (day === null) return;
    
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  // Render calendar header
  const renderHeader = () => (
    <View style={styles.calendarHeader}>
      <Text style={styles.monthYearText}>May 2025</Text>
      <View style={styles.daysHeader}>
        {days.map((day, index) => (
          <Text key={index} style={styles.dayHeaderText}>{day}</Text>
        ))}
      </View>
    </View>
  );
  
  // Render calendar days
  const renderCalendarDays = () => (
    <View style={styles.calendarGrid}>
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekRow}>
          {week.map((day, dayIndex) => (
            <TouchableOpacity 
              key={dayIndex} 
              style={[
                styles.dayCell,
                selectedDays.includes(day) && styles.selectedDayCell,
                day === null && styles.emptyCell
              ]}
              onPress={() => handleDayPress(day)}
              disabled={day === null}
            >
              {day !== null && (
                <Text 
                  style={[
                    styles.dayText,
                    selectedDays.includes(day) && styles.selectedDayText
                  ]}
                >
                  {day}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {renderHeader()}
        {renderCalendarDays()}
        
        <View style={styles.dotIndicator}>
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
    paddingTop: 20,
    paddingBottom: 40,
  },
  calendarHeader: {
    marginBottom: 15,
  },
  monthYearText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayHeaderText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 14,
    width: 30,
    textAlign: 'center',
  },
  calendarGrid: {
    flex: 1,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayCell: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayCell: {
    backgroundColor: '#66CDAA',
    elevation: 2,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  dayText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  selectedDayText: {
    color: '#1D3557',
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  dotIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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
