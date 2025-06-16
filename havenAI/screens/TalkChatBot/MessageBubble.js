import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageBubble({ message, from }) {
  const isUser = from === 'user';

  return (
    <View style={[styles.bubbleContainer, isUser ? styles.right : styles.left]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.botText]}> {typeof message === 'string' ? message : JSON.stringify(message)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    marginVertical: 4,
    paddingHorizontal: 10,
    maxWidth: '85%',
  },
  left: { alignSelf: 'flex-start' },
  right: { alignSelf: 'flex-end' },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  botBubble: {
    backgroundColor: '#F5F5F5',
  },
  userBubble: {
    backgroundColor: '#2D5D74',
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: 'white',
  },
  botText: {
    color: '#333',
  },
});
