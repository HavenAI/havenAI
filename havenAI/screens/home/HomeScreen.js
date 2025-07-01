import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import profile from '../../assets/profile.png'
import { useUser } from '../../context/UserContext.js';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '@env';
// Import tab screens
import SummaryScreen from './summary/SummaryScreen.js';
import ProgressCarouselScreen from './progress/ProgressCarouselScreen.js';
import CalendarScreen from './calendar/CalendarScreen.js';
import CutbackScreen from './summary/CutbackScreen.js';
import SessionsScreen from './summary/SessionsScreen.js';
import SummaryCarouselScreen from './summary/SummaryCarouselScreen.js';
import BottomTabBar from '../../components/common/BottomTabBar.js';
import Toast from 'react-native-toast-message';

import { getAuth } from 'firebase/auth';
const Stack = createNativeStackNavigator();


const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Custom Tab Navigator for Summary, Progress, Calendar, Cutback, and Sessions
function CustomTopTabNavigator({ activeTab, setActiveTab, topInset }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();
  const { setToken, setUid } = useUser();
  const auth = getAuth();
  const [userName, setUserName] = useState('');
  const [userQuitMethod, setUserQuitMethod] = useState('');

  useEffect(()=>{
    getUserName()
    getQuitMethod()
  },[])

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setToken(null);
      setUid(null);
      navigation.replace('LoginScreen');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const getUserName = async()=> {
    try{
      const res = await fetch(`${API_BASE_URL}/user/answers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
          const data = await res.json();
          setUserName(data["name"])
        } else {
          console.log("User not found, redirecting to login.");
        }
    } catch(error){
      console.log(error)
    }
  }
  const getQuitMethod = async()=> {
    try{
      const res = await fetch(`${API_BASE_URL}/user/answers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
          const data = await res.json();
          setQuitMethod(data["quit_method"])
        } else {
          console.log("User quit Method not found, redirecting to login.");
        }
    } catch(error){
      console.log(error)
    }
  
  }

  
  const greeting = React.useMemo(() => getGreeting(), []);
  const {token, setQuitMethod} = useUser();
  


  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topInset, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', height: 112, backgroundColor: '#1C454F' }]}>
        <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>{greeting}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <Text style={styles.username}>{userName}</Text>
          <View style={styles.profileWrapper}>
          <TouchableOpacity onPress={() => setShowMenu(prev => !prev)}>
            <Image source={profile} style={styles.profileImage} />
          </TouchableOpacity>

          {showMenu && (
            <View style={styles.dropdownContainer}>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>



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
        {activeTab === 'Summary' && <SummaryCarouselScreen/>}
        {activeTab === 'Progress' && <ProgressCarouselScreen />}
        {activeTab === 'Calendar' && <CalendarScreen />}
        {activeTab === 'Cutback' && <CutbackScreen />}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = React.useState('Summary');
  const [activeBottomTab, setActiveBottomTab] = React.useState('Home');
  const insets = useSafeAreaInsets();
  const { token } = useUser();
  
  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const checkForCheckin = async () => {
    console.log(token)
    try {
      console.log("hello")
      const res = await fetch(`${API_BASE_URL}/checkin/status`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      const data = await res.json();
      console.log('Check-in data:', data);
      if (data?.checkin_due) {
        Toast.show({
          type: 'info',
          text1: '⏰ Time to Check In',
          text2: 'How are you feeling? Log it from the Journal 💙',
          position: 'top',
          visibilityTime: 5000,
        });
      }
      
    } catch (error) {
      console.error('Check-in toast error:', error);
    }
  };

  // useEffect(() => {
  //   checkForCheckin(); // Initial check on mount
  //   // const interval = setInterval(checkForCheckin, 5 * 60 * 1000); // Every 5 minutes

  //   // return () => clearInterval(interval);
  // }, []);

  const bottomTabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { name: 'Self-Care', icon: 'grid-outline', activeIcon: 'grid' },
   
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
  
  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2A6D74" />
      <CustomTopTabNavigator activeTab={activeTab} setActiveTab={setActiveTab} topInset={insets.top} />
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
    backgroundColor: '#276270', 
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
  profileWrapper: {
    position: 'relative',
    marginLeft: 'auto',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 45,
    right: 0,
    width: 120,
    backgroundColor: '#CBCEEB',
    borderRadius: 8,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  
  logoutButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  
  logoutText: {
    color: '#276270',
    fontSize: 16,
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins-Regular',
    marginTop: 3,
  },
  activeBottomTabText: {
    color: '#FFFFFF', 
  
      },
    avatarOuterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40, 
    position: 'relative', 
    marginBottom: -50,
  },
  avatarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    zIndex: 1,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#264653',
    zIndex: 2, 
  },
});
