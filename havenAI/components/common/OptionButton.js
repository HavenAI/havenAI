import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default function OptionButton({ label, onPress, selected, fullWidth = true, variant }) {
  const isSubmit = variant === 'submit';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        isSubmit ? styles.submitButton : (selected ? styles.buttonSelected : styles.buttonUnselected),
        
      ]}
    >
      <Text style={[
        styles.label,
        isSubmit ? styles.submitLabel : (selected ? styles.labelSelected : styles.labelUnselected)
      ]}>
        {label}
      </Text>

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
  fullWidth: {
    width: '100%',
  },
  buttonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  buttonUnselected: {
    backgroundColor: COLORS.neutral,
    borderColor: COLORS.primary,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 15,
    textAlign: 'center',
  },
  labelSelected: {
    color: 'white',
  },
  labelUnselected: {
    color: COLORS.textPrimary,
  },
  submitButton: {
    backgroundColor: '#5B6199', // or any color you want
    borderColor: '#4459F6',
  },
  
  submitLabel: {
    color: 'white',
  },
  
});
