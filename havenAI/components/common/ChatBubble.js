import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import  COLORS from '../../constants/colors.js';

export default function ChatBubble({message, variant='large', align='left'}) {
  return (
    <View
        style={[
            styles.bubbleBase,
            variant === 'small'? styles.smallBubble : styles.largeBubble,
            align === 'right' ? styles.alignRight : styles.alignLeft
        ]}
    >
        <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    bubbleBase: {
      backgroundColor: COLORS.neutral,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 16,
      maxWidth: 318,
    },
    smallBubble: {
      borderRadius: 20,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderBottomRightRadius: 24,
      borderBottomLeftRadius: 4,
    },
    largeBubble: {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderBottomRightRadius: 24,
      borderBottomLeftRadius: 4,
    },
    alignLeft: {
      alignSelf: 'flex-start',
    },
    alignRight: {
      alignSelf: 'flex-end',
      backgroundColor: '#DCF8C6', // Optional: different color for user messages
    },
    text: {
      fontSize: 16,
      fontFamily: 'Poppins',
      color: COLORS.textPrimary,
      lineHeight: 24,
    },
  });