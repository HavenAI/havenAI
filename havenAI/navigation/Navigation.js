import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../components/WelcomeScreen.js';
import NicknameScreen from '../components/NicknameScreen.js';
import AgeRangeScreen from '../components/AgeRangeScreen.js';
import QuizIntroScreen from '../components/QuizIntroScreen.js';
import LoginScreen from '../components/LoginScreen.js';
import SignUpScreen from '../components/SignUpScreen.js';
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
        </Stack.Navigator>
    </NavigationContainer>
  );
}
