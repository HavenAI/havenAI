import COLORS from '../constants/colors.js';
import { StyleSheet } from 'react-native';


const TYPOGRAPHY = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 32,
    lineHeight: 48,
    textAlign: 'center',
    color: COLORS.textPrimary,
  },
  body: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS.textPrimary,

  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
  },
});

export default TYPOGRAPHY;
