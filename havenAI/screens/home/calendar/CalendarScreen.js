import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RecommendedSection from '../../../components/RecommendedSection';
import { useUser } from '../../../context/UserContext';

export default function CalendarScreen() {
  const { token, quitMethod } = useUser();
  const [nicotineFreeDates, setNicotineFreeDates] = useState([]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const generateCalendarWeeks = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const firstDayWeekday = (firstDay.getDay() + 6) % 7;
    const totalDays = lastDay.getDate();

    const weeks = [];
    let currentWeek = new Array(7).fill(null);

    for (let day = 1; day <= totalDays; day++) {
      const index = (firstDayWeekday + day - 1) % 7;
      if (index === 0 && day > 1) {
        weeks.push(currentWeek);
        currentWeek = new Array(7).fill(null);
      }
      currentWeek[index] = day;
    }
    weeks.push(currentWeek);
    return weeks;
  };

  const getStreakType = (day) => {
    const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    const prevStr = new Date(currentYear, currentMonth, day - 1).toISOString().split('T')[0];
    const nextStr = new Date(currentYear, currentMonth, day + 1).toISOString().split('T')[0];
    const isCurrent = nicotineFreeDates.includes(dateStr);
    const isPrev = nicotineFreeDates.includes(prevStr);
    const isNext = nicotineFreeDates.includes(nextStr);

    if (isPrev && isNext) return 'middle';
    if (!isPrev && isNext) return 'start';
    if (isPrev && !isNext) return 'end';
    if (!isPrev && !isNext && isCurrent) return 'solo';
    return null;
  };

  const getNicotineFreeDates = async () => {
    const res = await fetch('http://192.168.1.216:8000/log/user/nicotine_free_dates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setNicotineFreeDates(data.nicotine_free_dates);
    } else {
      console.log('Failed to fetch nicotine free dates');
    }
  };

  const getCutbackDates = async () => {
    const res = await fetch('http://192.168.1.216:8000/log/user/cutback_dates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setNicotineFreeDates(data.cutback_dates);
    } else {
      console.log('Failed to fetch cutback dates');
    }
  };

  useEffect(() => {
    if (quitMethod === 'Quit gradually') {
      getCutbackDates();
    } else {
      getNicotineFreeDates();
    }
  }, []);

  const weeks = generateCalendarWeeks();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Nicotine-Free Tracker</Text>
        <Text style={styles.monthYearText}>
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </Text>

        <View style={styles.daysHeader}>
          {days.map((d, i) => (
            <Text key={i} style={styles.dayHeaderText}>{d}</Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {weeks.map((week, i) => (
            <View key={i} style={styles.weekRow}>
              {week.map((day, j) => {
                const isToday = day === currentDay;
                const dateStr = day ? new Date(currentYear, currentMonth, day).toISOString().split('T')[0] : null;
                const isMarked = day && nicotineFreeDates.includes(dateStr);
                const streakType = day && quitMethod === 'Quit cold turkey' && isMarked ? getStreakType(day) : null;

                return (
                  <View
                    key={j}
                    style={[styles.dayCell,
                      streakType && styles[`streak_${streakType}`],
                      isMarked && quitMethod === 'Quit gradually' && styles.outlineBubble,
                      isToday && styles.todayCell]}
                  >
                    {day && (
                      <Text style={[styles.dayText,
                        streakType && styles.solidText,
                        isMarked && quitMethod === 'Quit gradually' && styles.outlineText,
                        isToday && styles.todayText]}>
                        {day}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>

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
  container: { flex: 1, backgroundColor: '#2A6D74' },
  contentContainer: { flex: 1, paddingHorizontal: 20, paddingBottom: 40 },
  titleText: {
    color: '#fff', fontFamily: 'Poppins', fontSize: 16, textAlign: 'center', marginBottom: 20,
  },
  monthYearText: {
    color: '#fff', fontFamily: 'Poppins', fontSize: 16, textAlign: 'center', marginBottom: 15,
  },
  daysHeader: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,
  },
  dayHeaderText: {
    color: '#fff', fontFamily: 'Poppins', fontSize: 14, width: 30, textAlign: 'center',
  },
  calendarGrid: { flex: 1 },
  weekRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,
  },
  dayCell: {
    width: 30, height: 30, justifyContent: 'center', alignItems: 'center',
  },
  solidText: {
    color: '#1C454F', fontWeight: 'bold', fontFamily: 'Poppins-SemiBold',
  },
  outlineBubble: {
    borderWidth: 2, borderColor: '#8AF0DC', borderRadius: 15,
  },
  outlineText: {
    color: '#8AF0DC', fontFamily: 'Poppins',
  },
  dayText: {
    color: '#fff', fontFamily: 'Poppins', fontSize: 14,
  },
  todayCell: {
    borderWidth: 2, borderColor: '#fff', borderRadius: 15,
  },
  todayText: {
    color: '#FFFFFF', fontFamily: 'Poppins-SemiBold',
  },
  dotIndicator: {
    flexDirection: 'row', justifyContent: 'center', marginTop: 20,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.3)', marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  streak_start: {
    backgroundColor: '#8AF0DC',
  },
  streak_middle: {
    backgroundColor: '#8AF0DC',
  },
  streak_end: {
    backgroundColor: '#8AF0DC',
  },
  streak_solo: {
    backgroundColor: '#8AF0DC', borderRadius: 15,
  },
});
