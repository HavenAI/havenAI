import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import tab screens
import SummaryScreen from './SummaryScreen';
import ProgressScreen from './ProgressScreen';
import CalendarScreen from './CalendarScreen';

const Stack = createNativeStackNavigator();

// Custom Tab Navigator for Summary, Progress, Calendar
function CustomTopTabNavigator({ activeTab, setActiveTab, topInset }) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(topInset, 10) }]}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.username}>Jamie</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="#fff" style={styles.profileIcon} />
        </TouchableOpacity>
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
  const insets = useSafeAreaInsets();
  
  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  // Bottom tab icons configuration
  const bottomTabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { name: 'Self-Care', icon: 'grid-outline', activeIcon: 'grid' },
    // Avatar will be placed here
    { name: 'Journal', icon: 'create-outline', activeIcon: 'create' },
    { name: 'Settings', icon: 'settings-outline', activeIcon: 'settings' }
  ];

  // Render bottom tab bar
  const renderBottomTabBar = () => {
    const firstTwoTabs = bottomTabs.slice(0, 2);
    const lastTwoTabs = bottomTabs.slice(2, 4);

    return (
      <View style={[styles.bottomTabBarContainer, { paddingBottom: insets.bottom }]}>
        <View style={styles.bottomTabBar}>
          {firstTwoTabs.map((tab) => (
            <TouchableOpacity
              key={tab.name}
              style={styles.bottomTab}
              onPress={() => setActiveBottomTab(tab.name)}
            >
              <Ionicons
                name={activeBottomTab === tab.name ? tab.activeIcon : tab.icon}
                size={26}
                color={activeBottomTab === tab.name ? '#FFFFFF' : '#B0D4D7'}
              />
              <Text
                style={[
                  styles.bottomTabText,
                  activeBottomTab === tab.name && styles.activeBottomTabText,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.avatarOuterContainer}>
            <TouchableOpacity style={styles.avatarButton} onPress={() => setActiveBottomTab('Talk')}> 
              <Image
                source={require('../../assets/avatarimg.png')}
                style={styles.avatarImage}
              />
              <Text style={[
                  styles.bottomTabText,
                  styles.avatarButtonText,
                  activeBottomTab === 'Talk' && styles.activeBottomTabText
                ]}
              >
                Talk
              </Text>
            </TouchableOpacity>
          </View>

          {lastTwoTabs.map((tab) => (
            <TouchableOpacity
              key={tab.name}
              style={styles.bottomTab}
              onPress={() => setActiveBottomTab(tab.name)}
            >
              <Ionicons
                name={activeBottomTab === tab.name ? tab.activeIcon : tab.icon}
                size={26}
                color={activeBottomTab === tab.name ? '#FFFFFF' : '#B0D4D7'}
              />
              <Text
                style={[
                  styles.bottomTabText,
                  activeBottomTab === tab.name && styles.activeBottomTabText,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2A6D74" />
      <CustomTopTabNavigator activeTab={activeTab} setActiveTab={setActiveTab} topInset={insets.top} />
      {renderBottomTabBar()}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2A6D74', // Main teal background
  },
  container: {
    flex: 1,
    backgroundColor: '#2A6D74',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    height: 50, // Fixed height for app bar to match reference image
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 14,
    marginRight: 5,
  },
  username: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  profileIcon: {
    marginLeft: 'auto',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 5,
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
  bottomTabBarContainer: {
    backgroundColor: '#264653',
  },
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#264653', // Dark teal/blue from target
    height: 60, // Adjusted height to match design
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5, // Reduced horizontal padding
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  bottomTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Each tab takes equal space
  },
  bottomTabText: {
    color: '#B0D4D7', // Light teal/gray for inactive text
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    marginTop: 3,
  },
  activeBottomTabText: {
    color: '#FFFFFF', // White for active text
    fontFamily: 'Poppins-SemiBold', // Changed from Poppins-Medium
  },
  avatarOuterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70, // Width for the avatar area
    position: 'relative', // For positioning the background shape
  },
  avatarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'relative',
    // bottom: 0,
    position: 'absolute',
    top: -60, // Adjusted to position the avatar above the bottom tab bar
    zIndex: 1,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 2,
    backgroundColor: '#2A6D74', // Match the main teal background
  },
  avatarButtonText: {
    // Specific styling for the text under the avatar if different from other tabs
    // For now, it will inherit from bottomTabText and activeBottomTabText
    // If it needs to be always white or a specific font, define here
    // Example: color: '#FFFFFF', fontFamily: 'Poppins-SemiBold',
  },
});
