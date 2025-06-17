import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView, TextInput,} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomTabBar from '../../components/common/BottomTabBar.js';
import { Dropdown } from 'react-native-element-dropdown';
import LocationIcon from '../../assets/Location-Icon.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import COLORS from '../../constants/colors';
import { formatDateTime } from '../../utils/time.js';
import { useUser } from '../../context/UserContext.js';

const Stack = createNativeStackNavigator();


function LoggingCravingVaping({topInset }) {
  const [showForm, setShowForm] = useState(false);
  const [entryType, setEntryType] = useState('Craving');
  const [time, setTime] = useState('Now');
  const [location, setLocation] = useState('');
  const [feeling, setFeeling] = useState('Stressed');
  const [notes, setNotes] = useState('');
  const [logs, setLogs] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const {token} = useUser()

  const getLoggingData = async () =>{

    const response = await fetch('http://192.168.1.216:8000/log/craving', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();

    setLogs(result["logs"])
  }
  useEffect(()=>{
    getLoggingData()
  },[])

  const handleSubmit = async () => {
    if (!location) {
      alert('Please enter a location');
      return;
    }
    const newLog = {
      id: Date.now(),
      time: formatDateTime(new Date()),
      entryType,
      timeOfDay: time,
      location,
      feeling,
      notes,
    };
    setLogs([newLog, ...logs]);
    setLocation('');
    setFeeling('Stressed');
    setEntryType('Craving');
    setTime('Now');
    setNotes('');
    setShowForm(false);

    
    const response = await fetch('http://192.168.1.216:8000/log/craving', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      mood: newLog.feeling,
      location: newLog.location,
      intensity: 0
    })
  });

  const result = await response.json();
  console.log(result);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topInset, height: 112, backgroundColor: '#1C454F' }]}>
        <Text style={styles.headerTitle}>Craving Journal</Text>
      </View>

        {/* Log New Entry Button */}
        <TouchableOpacity onPress={() => setShowForm(!showForm)}>
          <View style={styles.logNewEntryWrapper}>
          <LinearGradient
            colors={['#ACC8C3', '#276270']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.logNewEntryButton}
          >
          <Text style={styles.logNewEntryText}>Log New Entry ＋</Text>
          </LinearGradient>
          </View>
        </TouchableOpacity>
        {/* Expandable Form */}
        {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Log New Entry</Text>

          <Text style={styles.label}>Entry Type</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            data={[{ label: 'Craving', value: 'Craving' }, { label: 'Vaping', value: 'Vaping' }]}
            labelField="label"
            valueField="value"
            value={entryType}
            onChange={item => setEntryType(item.value)}
          />
          <Text style={styles.label}>When</Text>
          <TouchableOpacity
              style={styles.input}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={{ color: '#1C454F' }}>
                {time ? time : 'Select time'}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display="spinner"
                onChange={(event, selectedDate) => {
                  setShowTimePicker(false);
                  if (selectedDate) {
                    const formatted = selectedDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    });
                    setTime(formatted);
                  }
                }}
              />
            )}


            <Text style={styles.label}>Location</Text>
            <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            data={[
              { label: 'Home', value: 'Home' },
              { label: 'Work', value: 'Work' },
              { label: 'School', value: 'School' },
              { label: 'Party', value: 'Party' },
            ]}
            labelField="label"
            valueField="value"
            value={location}
            onChange={item => setLocation(item.value)}
          />

            <Text style={styles.label}>Feeling</Text>
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemTextStyle}
              data={[
                { label: 'Stressed', value: 'Stressed' },
                { label: 'Anxiety', value: 'Anxiety' },
                { label: 'Boredom', value: 'Boredom' },
                { label: 'Pressure', value: 'Pressure' }
              ]}
              labelField="label"
              valueField="value"
              value={feeling}
              onChange={item => setFeeling(item.value)}
            />

            <Text style={styles.label}>Notes (optional)</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="type here"
              placeholderTextColor="#999BAF"
              multiline
              value={notes}
              onChangeText={setNotes}
            />

            <TouchableOpacity onPress={handleSubmit}>
               <LinearGradient
                  colors={['#ACC8C3', '#276270']}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Save Entry</Text>
                </LinearGradient>
              </TouchableOpacity>

          </View>
        )}
    </View>
    {/* Separator Line */}
    <View style={styles.separator} />
    <Text style={styles.previousLogsTitle}>Previous Logs</Text>
      {logs.map(log => (
        <View key={log._id} style={styles.logCard}>
          <View style={styles.logCardHeader}>
            <Text style={styles.logTime}>{formatDateTime(new Date(log.timestamp))}</Text>
            <View style={styles.logBadge}>
              <Text style={styles.logBadgeText}>{log.mood}</Text>
            </View>
          </View>
          <View style={styles.logRow}>
            <Image source={LocationIcon} style={styles.logLocationIcon} />
            <Text style={styles.logLocation}>{log.location}</Text>
          </View>
          <Text style={styles.logNote} numberOfLines={1}>{log.notes}</Text>
        </View>
      ))}
      
    </ScrollView>
  );
}
export default function CravingJournalScreen() {
  const navigation = useNavigation();
  const [activeBottomTab, setActiveBottomTab] = React.useState('Home');
  const insets = useSafeAreaInsets();
  
  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);


  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2A6D74" />
      <LoggingCravingVaping topInset={insets.top} />

      <BottomTabBar
      activeBottomTab={activeBottomTab}
      setActiveBottomTab={setActiveBottomTab}
      navigation={navigation}
      insets={insets}
    />
    </View>
    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'Poppins',
  },
  
  logNewEntryWrapper: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  scrollContainer: {
    backgroundColor: COLORS.neutral,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginTop: 50,
    flex: 1,
  },  
  logNewEntryButton: {
    width: 360,
    height: 106,
    borderRadius: 24,
    backgroundColor: '#2A6D74',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginRight:20,
    marginLeft:20
  },
  logNewEntryText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins'
  },
  submitButton:{
    borderRadius: 20,
    height: 56,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins'
  },
  formContainer: {
    marginBottom: 24,
    marginLeft: 20,
    marginRight: 20
    
  },
  dropdown: {
    height: 50,
    borderColor: '#999BAF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.neutral,
    marginHorizontal: 10,
    marginTop: 4,
  },
  dropdownContainer: {
    backgroundColor: COLORS.neutral,
    borderColor: '#999BAF',
    borderWidth: 1,
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#999BAF',
  },
  itemTextStyle: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'Poppins',
  },  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '680',
    color: COLORS.textPrimary,
    marginBottom: 12,
    fontFamily: 'Poppins'
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    backgroundColor: COLORS.neutral,
    borderWidth: 1,
    borderColor: '#999BAF',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
    marginLeft: 10,
    marginRight: 10
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 16,
    marginBottom: 8,
  },

  previousLogsTitle: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '680',
    color: COLORS.textPrimary,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  activeTabText: {
    color: COLORS.white,
  },
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#264653',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
  bottomTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, 
  },
  bottomTabText: {
    color: '#B0D4D7',
    fontSize: 10,
    fontFamily: 'Poppins',
    marginTop: 3,
  },
  submitButtonText: {
    color: COLORS.neutral,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins'
  },
  logCard: {
    backgroundColor: '#E7E8F1',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 25,
    marginBottom: 12,
  },
  
  logCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  
  logTime: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'Poppins',
  },
  
  logBadge: {
    backgroundColor: '#A4D1DC80',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  
  logBadgeText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  logLocationIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
    resizeMode: 'contain',
  },
  
  logLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Poppins',
  },
  
  logNote: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: 'Poppins',
    marginTop: 2,
  },
});