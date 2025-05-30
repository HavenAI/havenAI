import React , {useState} from 'react'
import { View, TouchableOpacity, Text , ImageBackground} from 'react-native'
import COLORS from '../constants/colors';
import { StyleSheet } from 'react-native';
import background from '../assets/background.png';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const ageRanges = [
    '13-17 years old',
    '18-24 years old',
    '25-34 years old',
    '35-44 years old',
    '45 years and older',
]

export default function AgeRangeScreen() {
    const [selectedAge, setSelectedAge] = useState('');
    const {nickname, setAgeRange} = useUser();
    const navigation = useNavigation();
    
    const handleSelect = (range) => {
        setSelectedAge(range);
        setAgeRange(range);
    };
    
    const handleContinue = () => {
        if(selectedAge) {
            navigation.navigate('QuizIntroScreen');
        } else{
            alert('Please select an age range');
        }
    }
  return (
    <ImageBackground source={background} style={styles.background}>
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.title}>Nice to meet you, {nickname}. {'\n'}How old are you?</Text>
            <Text style={styles.subtitle}>
            This information is important to provide you the best support possible.
            </Text>

            {ageRanges.map((range, idx) => {
            const isSelected = selectedAge === range;
            return (
                <TouchableOpacity
                key={idx}
                style={[styles.ageButton, isSelected && styles.ageButtonSelected]}
                onPress={() => handleSelect(range)}
                >
                <Text style={[styles.ageText, isSelected && styles.ageTextSelected]}>
                    {range}
                </Text>
                </TouchableOpacity>
            );
            })}

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
        </View>
    </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 24,
      padding: 24,
      width: '100%',
      maxWidth: 359,
    },
    title: {
      fontSize: 22,
      fontFamily: 'Poppins-SemiBold',
      color: COLORS.textPrimary,
      marginBottom: 12,
      alignItems: 'center',
      textAlign: 'center',
      alignSelf: 'center',
    },
    subtitle: {
      fontSize: 14,
      fontFamily: 'Poppins',
      color: COLORS.textPrimary,
      marginBottom: 24,
    },
    ageButton: {
      backgroundColor: '#CBCEEB',
      borderRadius: 100,
      paddingVertical: 12,
      marginVertical: 6,
      alignItems: 'center',
      width:263,
      height: 56,
      alignSelf: 'center',
    },
    ageButtonSelected: {
      backgroundColor:'#9FA5E3',
    },
    ageText: {
      fontFamily: 'Poppins',
      fontSize: 16,
      color: COLORS.textPrimary,
      fontWeight: '500',
    },
    continueButton: {
        width:121,
        alignSelf: 'center',
      marginTop: 24,
      alignItems: 'center',
      paddingVertical: 12,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: COLORS.primary,
    },
    continueText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      color: COLORS.primary,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
      }
  });
