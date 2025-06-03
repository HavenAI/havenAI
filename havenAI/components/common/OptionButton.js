import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default function OptionButton({ label, onPress, fullWidth = true }) {
  return (
    <TouchableOpacity
      style={[styles.button, fullWidth ? styles.full : styles.compact]}
      onPress={onPress}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.neutral,
    marginVertical: 6,
  },
  full: {
    width: '100%',
  },
  compact: {
    width: 121,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.primary,
  },
});
