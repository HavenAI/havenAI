import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import COLORS from '../constants/colors.js'

function WelcomeScreen() {
  return (
    <View style={styles.card}>
        <View style={styles.avatarPlaceholder}/>
        <Text style={styles.title}>Hello!</Text>
        <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
            Welcome to <Text style={styles.brand}>Haven AI</Text>, your safe space to break free from vaping.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fefcfb',
        width: 304,
        height: 357,
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatarPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ccc',
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontFamily:'Poppins-SemiBold',
        lineHeight: 48,
        marginTop: 10,
        textAlign: 'center',
        color: COLORS.textPrimary,
    },
    subtitleContainer:{
        width:260,
        alignItems: 'center',
        marginTop: 18, 
    },
    subtitle: {
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 15,
        color: COLORS.textPrimary
        
    },
    brand:{
        fontFamily: 'Poppins',
        color: COLORS.brandPurple,
    }
});

export default WelcomeScreen;