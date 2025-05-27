import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../components/WelcomeScreen.js';
import NicknameScreen from '../components/NicknameScreen.js';

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
            <Stack.Screen name="Nickname" component={NicknameScreen} />
            {/*<StackActions.Screen name="AgeRange" component={AgeRangeScreen} /> */}
        </Stack.Navigator>
    </NavigationContainer>
  );
}
