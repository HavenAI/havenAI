import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default function UserBubble({ message }) {
  return (
    <View style={styles.bubbleContainer}>
        <Text style={styles.text}>{message}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    bubbleContainer: {
      alignSelf: 'flex-end',
      backgroundColor: COLORS.primary,
      paddingVertical: 10,
      paddingHorizontal: 16,
      paddingBottom: 10,
      marginTop: 16,
      marginBottom: 16,
      maxWidth: '80%',
      borderRadius: 20,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 24,
    },
    text: {
      fontFamily: 'Poppins',
      fontSize: 15,
      color: COLORS.white,
    },
  });
  