import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import COLORS from '../constants/colors.js';
import background from '../assets/background.png';
import { useNavigation } from '@react-navigation/native';
import sendIcon from '../assets/send.png';
import useKeyboardVisible from '../hooks/useKeyboardVisible.js';
import { useUser } from '../context/UserContext.js';


export default function NicknameScreen() {
    const navigation = useNavigation();
    const [nicknameInput, setNicknameInput] = useState('');
    const { setNickname } = useUser();
    const keyboardVisible = useKeyboardVisible();
    
    
    const handleNext = ()=>{
        if(nicknameInput.trim()){
          setNickname(nicknameInput);
            navigation.navigate('AgeRange')
        }
    };
  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
      <View style={[styles.cardWrapper, !keyboardVisible && styles.extraMargin]}>
      {/* Fixed Card */}
            <View style={styles.card}>
                <Text style={styles.title}>Hello!</Text>
                <Text style={styles.subtitle}>
                    We keep everything anonymous,
                    so all we need from you is a{" "}
                    nickname and we’re all set.
                </Text>
            </View>
        </View>
        
        {/* Keyboard responsive input row */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <View style={styles.inputWrapper}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="What should we call you..."
                placeholderTextColor="#7F8C8D"
                value={nicknameInput}
                onChangeText={setNicknameInput}
              />
              {keyboardVisible && (<TouchableOpacity
                style={styles.sendButton}
                onPress={handleNext}
              >
                <Image source={sendIcon} style={styles.sendIcon} />
              </TouchableOpacity>
            )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 150,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: COLORS.neutral,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    width: 310,
  },
  cardWrapper: {
    alignItems: 'center',
  },  
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 8,
    borderRadius: 100,
    width: 408,
    justifyContent: 'space-between',
    paddingHorizontal: 16,

  },
  input: {
    backgroundColor: COLORS.neutral,
    borderRadius: 100,
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontFamily: 'Poppins',
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  inputWrapper: {
    paddingHorizontal: 16,
    width: '100%',
    paddingBottom: 320,
  },
  sendButton: {
    width: 53,
    height: 53,
    borderRadius: 100,
    backgroundColor: '#1C454F',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
  sendIcon: {
    width: 25,
    height: 25,
  },  
  background: {
    flex: 1,
    resizeMode: 'cover',
  }
});
