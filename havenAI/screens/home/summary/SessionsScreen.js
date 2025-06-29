import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RecommendedSection from '../../../components/RecommendedSection';
import { useUser } from '../../../context/UserContext';
import { useFocusEffect ,useIsFocused} from '@react-navigation/native';
import { useCallback } from 'react';
import { API_BASE_URL } from '@env';
export default function SessionsScreen({visible}) {
  const MAX_BASELINE = 20;
  const { token , uid} = useUser();
  const [sessionsData, setSessionsData] = useState([]);

  const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  

  const fetchSessionData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/log/user/vapes_count_per_day`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const formatted = dayOrder.map(day => ({
          day,
          count: data[day] || 0,
        }));
        setSessionsData(formatted);
      } else {
        console.log('Failed to fetch session data');
      }
    } catch (err) {
      console.error(err);
    }
  };

useEffect(() => {
  if (visible) {
    fetchSessionData()
  }
}, [visible]);
  
  
  

  const renderBar = (item, index) => {
    const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    const isCurrentDay = index === currentDayIndex;
    const isFuture = index > currentDayIndex;
    const barHeight = (item.count / MAX_BASELINE) * 100;
    
    return (
      <View key={index} style={styles.barContainer}>
        <View style={styles.barWrapper}>
          {item.count > 0 && <Text style={styles.valueText}>{item.count}</Text>}
          <View style={[styles.backgroundBar, { opacity: isFuture ? 0.5 : 1 }]} />
          <View
            style={[
              styles.filledBar,
              {
                height: `${Math.max(barHeight, 0)}%`,
                backgroundColor: '#8AF0DC',
                opacity: isFuture ? 0.3 : 1,
              },
            ]}
          />
        </View>
        <Text
          style={[
            styles.dayLabel,
            {
              color: isCurrentDay ? '#8AF0DC' : '#FFFFFF',
              opacity: isFuture ? 0.4 : 1,
            },
          ]}
        >
          {item.day[0]}
        </Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2A6D74' },
  contentContainer: { flex: 1, paddingHorizontal: 20, paddingBottom: 40 },
  titleText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 250,
    marginBottom: -20
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
});
