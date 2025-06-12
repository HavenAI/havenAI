import React from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'
import COLORS from '../constants/colors.js'
import background from '../assets/background.png';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import havenAIlogo from '../assets/havenAIlogo.png';


function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <ImageBackground source={background} style={styles.background}>
        <View style={styles.container}>
            <View style={styles.card}>
            <Image source={havenAIlogo} style={styles.avatarPlaceholder} resizeMode="cover"/>
            <Text style={styles.title}>Hello!</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>
                Welcome to <Text style={styles.brand}>Haven AI</Text>, your safe space to break free from vaping.
                </Text>
            </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>

        
    );
    };

    const styles = StyleSheet.create({
        card: {
            backgroundColor: COLORS.neutral,
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
        },
        button: {
            width: 125,
            height: 48,
            backgroundColor: COLORS.neutral,
            borderWidth: 1,
            borderColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 24,
            marginTop: 20,
        },
        buttonText: {
            fontFamily: 'Poppins',
            fontSize: 16,
            fontWeight: '600',
            color: '#276270',
        },
        background: {
            flex: 1,
            resizeMode: 'cover',
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
        }
});

export default WelcomeScreen;