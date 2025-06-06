import React, { useRef, useState } from 'react';
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
import googleIcon from '../assets/Google.png';
import eyeIcon from '../assets/eye.png';
import { useNavigation } from '@react-navigation/native';
import { validateConfirmPassword, validateEmail, validatePassword } from '../utils/validation.js';
import * as Animatable from 'react-native-animatable';

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const handleSignUp = () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(password, confirmPassword);

    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmError(confirmErr);

    if (emailErr) emailRef.current?.shake(800);
    if (passwordErr) passwordRef.current?.shake(800);
    if (confirmErr) confirmRef.current?.shake(800);

    if (!emailErr && !passwordErr && !confirmErr) {
      console.log("Sign Up Successful");
      navigation.navigate('Nickname');
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login pressed");
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Welcome Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Hello!</Text>
          <Text style={styles.subtitle}>
            Welcome to <Text style={styles.linkText}>Haven AI</Text>, your safe space to break free from vaping.
          </Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputBlock}>
          {/* Email Field */}
          <Text style={styles.label}>Email Address</Text>
          <View style={{ position: 'relative', marginBottom: 24 }}>
            <Animatable.View ref={emailRef} style={[styles.inputWrapper,emailError && styles.errorInput]}>
              <TextInput
                style={[styles.input]}
                placeholder="hello@example.com"
                placeholderTextColor="#7F8C8D"
                textContentType="emailAddress"
                autoComplete="email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
              />
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
            <Animatable.View ref={passwordRef} style={[styles.inputWrapper,passwordError && styles.errorInput]}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999DA3"
                textContentType="password"
                autoComplete="password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
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

          {/* Confirm Password Field */}
          <Text style={styles.label}>Confirm Password</Text>
          <View style={{ position: 'relative', marginBottom: 24 }}>
            <Animatable.View ref={confirmRef} style={[styles.inputWrapper,confirmError && styles.errorInput]}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999DA3"
                textContentType="password"
                autoComplete="password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (confirmError) setConfirmError('');
                }}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Image source={eyeIcon} style={styles.eyeIcon} />
              </TouchableOpacity>
            </Animatable.View>
            {confirmError ? (
              <View style={styles.errorWrapper}>
                <Text style={styles.errorText}>{confirmError}</Text>
              </View>
            ) : null}
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.orDivider}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          {/* Google Login */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Image source={googleIcon} style={styles.googleIcon} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.signupText}>
            Already have an account? <Text style={styles.linkText}>Login</Text>
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
    marginTop: 32,
    width: '95%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 20,
    color: COLORS.textPrimary,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 30,
    marginBottom: 4,
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
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
    color: COLORS.textPrimary,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorWrapper: {
    position: 'absolute',
    bottom: -18,
    left: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: 24,
    marginBottom: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#120101',
  },
  orText: {
    marginHorizontal: 8,
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
    marginTop: 20,
  },
  linkText: {
    color: '#5800CB',
    fontFamily: 'Poppins-SemiBold',
  },
});
