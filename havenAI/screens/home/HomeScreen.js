import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import tab screens
import SummaryScreen from './SummaryScreen';
import ProgressScreen from './ProgressScreen';
import CalendarScreen from './CalendarScreen';

const Stack = createNativeStackNavigator();

// Custom Tab Navigator for Summary, Progress, Calendar
function CustomTopTabNavigator({ activeTab, setActiveTab }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning</Text>
        <Text style={styles.username}>Jamie</Text>
        <Ionicons name="person-circle-outline" size={24} color="#fff" style={styles.profileIcon} />
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Summary' && styles.activeTab]} 
          onPress={() => setActiveTab('Summary')}
        >
          <Text style={[styles.tabText, activeTab === 'Summary' && styles.activeTabText]}>Summary</Text>
          {activeTab === 'Summary' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Progress' && styles.activeTab]} 
          onPress={() => setActiveTab('Progress')}
        >
          <Text style={[styles.tabText, activeTab === 'Progress' && styles.activeTabText]}>Progress</Text>
          {activeTab === 'Progress' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Calendar' && styles.activeTab]} 
          onPress={() => setActiveTab('Calendar')}
        >
          <Text style={[styles.tabText, activeTab === 'Calendar' && styles.activeTabText]}>Calendar</Text>
          {activeTab === 'Calendar' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContent}>
        {activeTab === 'Summary' && <SummaryScreen />}
        {activeTab === 'Progress' && <ProgressScreen />}
        {activeTab === 'Calendar' && <CalendarScreen />}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = React.useState('Summary');
  const [activeBottomTab, setActiveBottomTab] = React.useState('Home');

  // Bottom tab icons configuration
  const bottomTabs = [
    { name: 'Home', icon: 'home', activeIcon: 'home' },
    { name: 'Self-Care', icon: 'grid-outline', activeIcon: 'grid' },
    { name: 'Talk', icon: 'chatbubble-outline', activeIcon: 'chatbubble' },
    { name: 'Journal', icon: 'create-outline', activeIcon: 'create' },
    { name: 'Settings', icon: 'settings-outline', activeIcon: 'settings' }
  ];

  // Render bottom tab bar
  const renderBottomTabBar = () => (
    <View style={styles.bottomTabBar}>
      {bottomTabs.map((tab) => (
        <TouchableOpacity 
          key={tab.name}
          style={styles.bottomTab}
          onPress={() => setActiveBottomTab(tab.name)}
        >
          <Ionicons 
            name={activeBottomTab === tab.name ? tab.activeIcon : tab.icon} 
            size={24} 
            color={activeBottomTab === tab.name ? '#2A9D8F' : 'gray'} 
          />
          <Text 
            style={[styles.bottomTabText, activeBottomTab === tab.name && styles.activeBottomTabText]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTopTabNavigator activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderBottomTabBar()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1D3557',
  },
  container: {
    flex: 1,
    backgroundColor: '#1D3557',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginRight: 5,
  },
  username: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    flex: 1,
  },
  profileIcon: {
    marginLeft: 'auto',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    position: 'relative',
  },
  activeTab: {},
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 1.5,
  },
  tabContent: {
    flex: 1,
  },
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  bottomTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottomTabText: {
    color: 'gray',
    fontSize: 12,
    fontFamily: 'Poppins',
    marginTop: 4,
  },
  activeBottomTabText: {
    color: '#2A9D8F',
  },
});
