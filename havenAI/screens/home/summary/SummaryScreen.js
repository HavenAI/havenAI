import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RecommendedSection from '../../../components/RecommendedSection';
import { useUser } from '../../../context/UserContext';

export default function SummaryScreen() {
  const { selectedDays, setSelectedDays } = useUser();
  
  // Calculate the number of nicotine-free days
  const nicotineFreeDays = selectedDays.length;
    // Handle reset button press
  const handleReset = () => {
    Alert.alert(
      "Reset Nicotine-Free Streak?",
      "This will untick all calendar days and reset your streak to 0. This can't be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => setSelectedDays([])
        }
      ]
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.infoText}>You've been nicotine free for</Text>
          <View style={styles.counterContainer}>
          <Text style={styles.counterNumber}>{nicotineFreeDays}</Text>
          <Text style={styles.counterLabel}>days</Text>
        </View>
        
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
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
    fontSize: 16,
    marginBottom: 45,
    textAlign: 'center',
  },
  counterContainer: {
    alignItems: 'center',
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
    fontSize: 18,
    marginTop: -5,
  },
  resetButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
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
