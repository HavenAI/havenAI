import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../utils/firebase';
import * as Animatable from 'react-native-animatable';
import COLORS from '../constants/colors';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const emailRef = useRef(null);

  const handleResetPassword = () => {
    if (!email) {
      setError('Email is required');
      emailRef.current?.shake(800);
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          'Check your inbox',
          'Password reset email has been sent!'
        );
        navigation.goBack(); // go back to login screen
      })
      .catch((err) => {
        console.log('Reset error:', err);
        if (err.code === 'auth/user-not-found') {
          setError('No user found with this email.');
          emailRef.current?.shake(800);
        } else if (err.code === 'auth/invalid-email') {
          setError('Invalid email address.');
          emailRef.current?.shake(800);
        } else {
          Alert.alert('Error', err.message || 'Something went wrong.');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot your password?</Text>
      <Text style={styles.subtitle}>Enter your email address and we’ll send you a link to reset your password.</Text>
      
      <Animatable.View ref={emailRef} style={[styles.inputWrapper, error && styles.errorInput]}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError('');
          }}
        />
      </Animatable.View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: COLORS.neutral,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 20,
    color: COLORS.textPrimary,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: COLORS.textPrimary,
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  linkText: {
    color: '#5800CB',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontFamily: 'Poppins',
    fontSize: 12,
    marginBottom: 10,
  },
});
