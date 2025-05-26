import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import COLORS from '../constants/colors.js';

export default function NicknameScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subtitle}>
          We keep everything anonymous,{"\n"}
          so all we need from you is a{" "}
          nickname and we’re all set.
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="What should we call you..."
        placeholderTextColor="#7F8C8D"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 60,
  },
  card: {
    backgroundColor: '#fefcfb',
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    width: 304,
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
  input: {
    backgroundColor: '#fefcfb',
    borderRadius: 24,
    width: 304,
    height: 48,
    paddingHorizontal: 20,
    fontFamily: 'Poppins',
    fontSize: 16,
    color: COLORS.textPrimary,
  },
});
