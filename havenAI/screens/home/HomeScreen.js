import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import profile from '../../assets/profile.png'
import { useUser } from '../../context/UserContext.js';
import { useNavigation } from '@react-navigation/native';
// Import tab screens
import SummaryScreen from './summary/SummaryScreen.js';
import ProgressScreen from './progress/ProgressScreen.js';
import CalendarScreen from './calendar/CalendarScreen.js';
import CutbackScreen from './summary/CutbackScreen.js';
import SessionsScreen from './progress/SessionsScreen.js';
import ProgressCarouselScreen from './summary/ProgressCarouselScreen.js';

const Stack = createNativeStackNavigator();


const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Custom Tab Navigator for Summary, Progress, Calendar, Cutback, and Sessions
function CustomTopTabNavigator({ activeTab, setActiveTab, topInset }) {
  const [userName, setUserName] = useState('');
  useEffect(()=>{
    getUserName()
  },[])
  const getUserName = async()=> {
    try{
      const res = await fetch("http://192.168.1.216:8000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
          const data = await res.json();
          setUserName(data)
        } else {
          console.log("User not found, redirecting to login.");
        }
    } catch(error){
      console.log(error)
    }
  
  }

  
  const greeting = React.useMemo(() => getGreeting(), []);
  const {nickname, token} = useUser();


  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topInset, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', height: 112, backgroundColor: '#1C454F' }]}>
        <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>{greeting}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <Text style={styles.username}>{userName}</Text>
          <TouchableOpacity style={styles.profileIcon}>
            <Image
            source={profile} style={ {size: 24, color: "#fff"}}
            />
          </TouchableOpacity>
        </View>
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
        {activeTab === 'Summary' && <ProgressCarouselScreen/>}
        {activeTab === 'Progress' && <ProgressScreen />}
        {activeTab === 'Calendar' && <CalendarScreen />}
        {activeTab === 'Cutback' && <CutbackScreen />}
        {activeTab === 'Sessions' && <SessionsScreen />}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();

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
  const iconMap = {
    Home: {
      light: require('../../assets/HomeVectorLight.png'),
      dark: require('../../assets/HomeVectorDark.png'),
    },
    Journal: {
      light: require('../../assets/JournalVectorLight.png'),
      dark: require('../../assets/JournalVectorDark.png'),
    },
    Settings: {
      light: require('../../assets/SettingsVectorLight.png'),
      dark: require('../../assets/SettingsVectorDark.png'),
    },
    'Self-Care': {
      light: require('../../assets/Self-CareVectorLight.png'),
      dark: require('../../assets/Self-CareVectorDark.png'),
    },
  };
  

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
              <Image
                source={
                  activeBottomTab === tab.name
                  ? iconMap[tab.name]?.dark
                  : iconMap[tab.name]?.light            
                }
                style={{ width: 24, height: 24, tintColor: activeBottomTab === tab.name ? '#fff' : '#B0D4D7' }}
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
            <TouchableOpacity style={styles.avatarButton} onPress={() => {
              console.log("🟢 Talk avatar pressed");
              navigation.navigate('Talk');
              setActiveBottomTab('Talk')}}> 
              <View style={styles.avatarBackgroundShape} />
              <Image
                  source={require('../../assets/havenAIlogo.png')}
                style={styles.avatarImage}
              />
              <Text style={[
                  styles.bottomTabText,
                  styles.avatarButtonText, // Central avatar text might need specific styling
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
              <Image
                source={
                  activeBottomTab === tab.name
                  ? iconMap[tab.name]?.dark
                  : iconMap[tab.name]?.light            
                }
                style={{ width: 24, height: 24, tintColor: activeBottomTab === tab.name ? '#fff' : '#B0D4D7' }}
                
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
    backgroundColor: '#276270', // Main teal background
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
  },  username: {
    color: '#8AF0DC',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  profileIcon: {
    marginLeft: 'auto',
  },  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 18,
    marginBottom: 5,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    position: 'relative',
  },
  activeTab: {},
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
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
    backgroundColor: '#8AF0DC',
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
     // Changed from Poppins-Medium
      },
    avatarOuterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40, // Width for the avatar area
    position: 'relative', // For positioning the background shape
    marginBottom: -50, // Adjusted to match reference design
  },
  avatarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15, // Adjusted to make avatar pop up more like in the reference design
    zIndex: 1,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#264653', // Match bottom bar background for a seamless look
    zIndex: 2, // Ensure avatar is above its background shape
  },
});
