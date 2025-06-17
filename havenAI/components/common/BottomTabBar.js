import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function BottomTabBar({ activeBottomTab, setActiveBottomTab }) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const bottomTabs = [
    { name: 'Home' },
    { name: 'Self-Care' },
    { name: 'Journal' },
    { name: 'Settings' },
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

  const firstTwoTabs = bottomTabs.slice(0, 2);
  const lastTwoTabs = bottomTabs.slice(2, 4);

  return (
    <View style={[styles.bottomTabBarContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.bottomTabBar}>
        {firstTwoTabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.bottomTab}
            onPress={() => {
              if (tab.name === 'Journal') navigation.navigate('CravingJournal');
              else navigation.navigate(tab.name);
              setActiveBottomTab(tab.name);
            }}>
            <Image
              source={activeBottomTab === tab.name ? iconMap[tab.name].dark : iconMap[tab.name].light}
              style={{ width: 24, height: 24, tintColor: activeBottomTab === tab.name ? '#fff' : '#B0D4D7' }}
            />
            <Text style={[styles.bottomTabText, activeBottomTab === tab.name && styles.activeBottomTabText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.avatarOuterContainer}>
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => {
              navigation.navigate('Talk');
              setActiveBottomTab('Talk');
            }}>
            <Image source={require('../../assets/havenAIlogo.png')} style={styles.avatarImage} />
            <Text style={[styles.bottomTabText, styles.avatarButtonText, activeBottomTab === 'Talk' && styles.activeBottomTabText]}>Talk</Text>
          </TouchableOpacity>
        </View>

        {lastTwoTabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.bottomTab}
            onPress={() => {
              if (tab.name === 'Journal') navigation.navigate('CravingJournal');
              else navigation.navigate(tab.name);
              setActiveBottomTab(tab.name);
            }}>
            <Image
              source={activeBottomTab === tab.name ? iconMap[tab.name].dark : iconMap[tab.name].light}
              style={{ width: 24, height: 24, tintColor: activeBottomTab === tab.name ? '#fff' : '#B0D4D7' }}
            />
            <Text style={[styles.bottomTabText, activeBottomTab === tab.name && styles.activeBottomTabText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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