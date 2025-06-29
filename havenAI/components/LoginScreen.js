import React, { useState , useRef} from 'react';
import { API_BASE_URL } from '@env';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert
} from 'react-native';
import COLORS from '../constants/colors.js';
import background from '../assets/background.png';
//import googleIcon from '../assets/Google.png';
import eyeIcon from '../assets/eye.png';
import { useNavigation } from '@react-navigation/native';
import { validateEmail, validatePassword } from '../utils/validation.js';
import * as Animatable from 'react-native-animatable';
import {auth} from '../utils/firebase.js';
import{ signInWithEmailAndPassword } from 'firebase/auth';
//import { useGoogleAuth } from '../utils/googleAuth';
import {useUser} from '../context/UserContext.js'
export default function LoginScreen() {
    const navigation = useNavigation();
    const {setToken, setUid} = useUser();
    //const [promptAsync] = useGoogleAuth(navigation); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
   
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    
    const handleNext = ()=>{
        const emailErr  = validateEmail(email);
        const passwordErr = validatePassword(password);
        
       
        setEmailError(emailErr);
        setPasswordError(passwordErr);
        

        if (emailErr) emailRef.current?.shake(800);
        if (passwordErr) passwordRef.current?.shake(800);
    
        if (!emailErr && !passwordErr) {
          signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              const token = await userCredential.user.getIdToken();
              const user = userCredential.user;
              const uid = user.uid;
              console.log(`${API_BASE_URL}/user/onboarding`)
              try{
                const res = await fetch(`${API_BASE_URL}/user/onboarding`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
              });
              if (res.ok) {
                const data = await res.json();

                if (data && data.completed === true) {
                navigation.replace("Home");
                } else {
                navigation.navigate("Nickname");
                }
              } else {
                Alert.alert("Login Error", "Failed to fetch onboarding status.");
                // navigation.navigate('LoginScreen');
                console.log("User not found, redirecting to login.");
              }
              setToken(token);
              setUid(uid);
            }catch (error) {
              console.error("Error checking onboarding status:", error);
              Alert.alert("Login Error", "Could not connect to backend.");
            }
        })
            .catch((error) => {
              console.log("Login error:", error);
            
              if (error.code === 'auth/user-not-found') {
                setEmailError("User not found. Please sign up first.");
                emailRef.current?.shake(800);
              } else if (error.code === 'auth/wrong-password') {
                setPasswordError("Incorrect password.");
                passwordRef.current?.shake(800);
              } else if (error.code === 'auth/invalid-credential') {
                setPasswordError("Invalid login. Please check your email and password.");
                passwordRef.current?.shake(800);
              } else {
                Alert.alert("Login Error", error.message || "Something went wrong.");
              }
            });
                    
        }
    };

    // const handleGoogleLogin = () =>{
    //   promptAsync();
    // }
  return (
    <ImageBackground source={background} style={styles.background}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

        {/* Fixed Card */}
        <View style={styles.card}>
                <Text style={styles.title}>Hello!</Text>
                <Text style={styles.subtitle}>
                    Welcome to <Text style={styles.linkText}>Haven AI</Text>, your safe space to break free from vaping.
                </Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputBlock}>
        <Text style={styles.label}>Email Address</Text>
        <View style={{ position: 'relative', marginBottom: 32 }}>
        <Animatable.View ref={emailRef} style={[styles.inputWrapper, emailError && styles.errorInput]}>
            <TextInput
                style={styles.input}
                placeholder="hello@example.com"
                placeholderTextColor="#7F8C8D"
                textContentType='emailAddress'
                autoComplete='email'
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError('');
                  }}
                keyboardType="email-address"
                autoCapitalize='none'>
            </TextInput>
            </Animatable.View>
            {emailError ? (
            <View style={styles.errorWrapper}>
            <Text style={styles.errorText}>{emailError}</Text>
            </View>
        ) : null}
        </View>
            

            {/* Password Field */}
            <View style={styles.passwordRow}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
            </View>
            <View style={{ position: 'relative', marginBottom: 24 }}>
            <Animatable.View ref={passwordRef} style={[styles.inputWrapper, passwordError && styles.errorInput]}>
                <TextInput
                style={styles.input}
                placeholder='••••••••'
                placeholderTextColor="#999DA3"
                textContentType="password"
                autoComplete='password'
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError('');
                }}
                secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={eyeIcon} style={styles.eyeIcon} />
                </TouchableOpacity>
            </Animatable.View>
            {passwordError ? (
                <View style={styles.errorWrapper}>
                <Text style={styles.errorText}>{passwordError}</Text>
                </View>
            ) : null}
            </View>
            
            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleNext}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* <View style={styles.orDivider}>
                <View style={styles.line} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.line} />
            </View> */}
           

            {/* Google Login Button
            <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
                <Image source={googleIcon} style={styles.googleIcon} />
                <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity> */}
        </View>

        <TouchableOpacity onPress={()=> {
        navigation.navigate('SignUpScreen')}}>
            <Text style={styles.signupText}>
                Don’t have an account?<Text style={styles.linkText}>Sign Up</Text>
            </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>

      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'space-between',
      paddingVertical: 60,
    },
    card: {
      backgroundColor: COLORS.neutral,
      borderRadius: 24,
      padding: 24,
      alignItems: 'center',
      marginTop: 50,
      width: 320,
      height: 160,
      alignSelf: 'center',
    },
    title: {
      fontSize: 28,
      fontFamily: 'Poppins-SemiBold',
      color: COLORS.textPrimary,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Poppins',
      color: COLORS.textPrimary,
      textAlign: 'center',
      lineHeight: 22,
    },
    inputBlock: {
      gap: 16,
      marginTop: 32,
      width: '95%',
      alignSelf: 'center',
      paddingBottom: 24,
    },
    label: {
      fontSize: 20,
      color: COLORS.textPrimary,
      fontFamily: 'Poppins-SemiBold',
      lineHeight: 30,
    },
    input: {
      backgroundColor: COLORS.neutral,
      padding: 16,
      borderRadius: 30,
      fontSize: 16,
      fontFamily: 'Poppins',
      color: COLORS.textPrimary,
      flex: 1,
    },
    passwordRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.neutral,
      borderRadius: 30,
      paddingHorizontal: 16,
      height: 56,
      width: '100%',
    },
    eyeIcon: {
      width: 24,
      height: 24,
      marginLeft: 10,
    },
    loginButton: {
      backgroundColor: COLORS.neutral,
      height: 56,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: COLORS.textPrimary,
      borderWidth: 1,
      marginTop: 16,
      marginBottom: 2,
    },
    loginButtonText: {
      color: COLORS.textPrimary,
      fontSize: 16,
      fontFamily: 'Poppins-SemiBold',
      lineHeight: 24,
      
    },
    orDivider: {
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#120101',
    },
    orText: {
      fontFamily: 'Poppins',
      color: '#120101',
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.neutral,
      borderRadius: 30,
      paddingVertical: 14,
      gap: 10,
      width: '100%',
      marginTop: 2,
    },
    googleIcon: {
      width: 22,
      height: 22,
    },
    googleText: {
      fontSize: 15,
      fontFamily: 'Poppins-Medium',
    },
    signupText: {
      textAlign: 'center',
      fontSize: 14,
      color: '#333',
      fontFamily: 'Poppins',
      marginBottom: 20,
    },
    linkText: {
      color: '#5800CB',
      fontFamily: 'Poppins-SemiBold',
    },
    errorInput: {
        borderWidth: 1,
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'Poppins',
        lineHeight: 16,
    },
    errorWrapper: {
        position: 'absolute',
        bottom: -18,
        left: 16,
      },
          
  });
  