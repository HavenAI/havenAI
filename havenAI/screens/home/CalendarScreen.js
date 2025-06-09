import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RecommendedSection from '../../components/RecommendedSection';
import { useUser } from '../../context/UserContext';

export default function CalendarScreen() {
  const { selectedDays, setSelectedDays } = useUser();
  // Get current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  
  // Calendar data - dynamic based on current month
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  // Generate calendar weeks dynamically
  const generateCalendarWeeks = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
    const daysInMonth = lastDayOfMonth.getDate();
    
    const weeks = [];
    let currentWeek = new Array(7).fill(null);
    
    // Fill in the days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayIndex = (firstDayWeekday + day - 1) % 7;
      
      if (dayIndex === 0 && day > 1) {
        weeks.push(currentWeek);
        currentWeek = new Array(7).fill(null);
      }
      
      currentWeek[dayIndex] = day;
    }
    
    weeks.push(currentWeek);
    return weeks;
  };
    const weeks = generateCalendarWeeks();
  
  // Handle day selection - only allow past and current days
  const handleDayPress = (day) => {
    if (day === null || day > currentDay) return; // Prevent future day selection
    
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  // Check if a day is in the future
  const isFutureDay = (day) => {
    return day !== null && day > currentDay;
  };
  
  // Get month name
  const getMonthName = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[currentMonth];
  };
  
  // Render calendar header
  const renderHeader = () => (
    <View style={styles.calendarHeader}>
      <Text style={styles.monthYearText}>{getMonthName()} {currentYear}</Text>
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
          {week.map((day, dayIndex) => {
            const isSelected = selectedDays.includes(day);
            const isFuture = isFutureDay(day);
            const isToday = day === currentDay;
            
            return (
              <TouchableOpacity 
                key={dayIndex} 
                style={[
                  styles.dayCell,
                  isSelected && styles.selectedDayCell,
                  day === null && styles.emptyCell,
                  isFuture && styles.futureDayCell,
                  isToday && styles.todayCell
                ]}
                onPress={() => handleDayPress(day)}
                disabled={day === null || isFuture}
              >
                {day !== null && (
                  <Text 
                    style={[
                      styles.dayText,
                      isSelected && styles.selectedDayText,
                      isFuture && styles.futureDayText,
                      isToday && styles.todayText
                    ]}
                  >
                    {day}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
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
  },  selectedDayText: {
    color: '#1D3557',
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  futureDayCell: {
    backgroundColor: 'transparent',
    opacity: 0.3,
  },
  futureDayText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontFamily: 'Poppins',
  },
  todayCell: {
    borderWidth: 2,
    borderColor: '#8AF0DC',
  },
  todayText: {
    color: '#8AF0DC',
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
