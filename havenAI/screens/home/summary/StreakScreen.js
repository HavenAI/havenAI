import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { useUser } from '../../../context/UserContext';

export default function StreakScreen() {
  const { token } = useUser();
  const [nicotineFreeDays, setNicotineFreeDays] = useState(0)



  const getStreakCount = async () => {
    const res = await fetch ("http://192.168.1.216:8000/log/user/streak",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res)
  if(res.ok){
    const data = await res.json();
 
    setNicotineFreeDays(data["nicotine_free_days"])
  }else{
    console.log("failed to fetch streak count")
  }
}

useEffect(()=>{
  getStreakCount()
},[])
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
