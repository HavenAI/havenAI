import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from '../screens/home/HomeScreen.js';
import WelcomeScreen from '../components/WelcomeScreen.js';
import NicknameScreen from '../components/NicknameScreen.js';
import AgeRangeScreen from '../components/AgeRangeScreen.js';
import QuizIntroScreen from '../components/QuizIntroScreen.js';
import LoginScreen from '../components/LoginScreen.js';
import SignUpScreen from '../components/SignUpScreen.js';
import TalkScreen from '../screens/TalkChatBot/TalkScreen.js'
import CravingJournalScreen from '../screens/journal/CravingJournalScreen.js';
import SettingScreen from '../screens/settings/SettingScreen.js';
import NotificationSettingsScreen from '../screens/settings/NotificationSettingsScreen.js';
import PreferenceScreen from '../screens/settings/PreferenceScreen.js';
import FAQScreen from '../screens/settings/FAQScreen.js';
import PrivacyPolicyScreen from '../screens/settings/PrivacyPolicyScreen.js';
import TermsAndConditionsScreen from '../screens/settings/TermsAndConditionsScreen.js';
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="Nickname" component={NicknameScreen} />
            <Stack.Screen name="AgeRange" component={AgeRangeScreen} />
            <Stack.Screen name="QuizIntroScreen" component={QuizIntroScreen} />
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} key={props.route.params?.fresh ? 'home-fresh' : 'home-default'} />}
            </Stack.Screen>
            <Stack.Screen name="Talk" component={TalkScreen} />
            <Stack.Screen name="CravingJournal" component={CravingJournalScreen} />
            <Stack.Screen name="Settings" component={SettingScreen} />
            <Stack.Screen name="Preferences" component={PreferenceScreen} />
            <Stack.Screen name="Notifications" component={NotificationSettingsScreen} />
            <Stack.Screen name="FAQScreen" component={FAQScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
