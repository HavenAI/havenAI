import React from 'react'
import { TextInput, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import  COLORS  from '../../constants/colors.js'
import sendIcon from '../../assets/send.png';

export default function InputBubble({
    value,
    onChangeText,
    placeholder = 'Type a message',
    onSend,
    showSend = false
}) {
  return (
    <View style={styles.inputRow}>
        <TextInput 
        style={styles.input}
        placeholder='Type a message'
        placeholderTextColor='#7F8C8D'
        value={value}
        onChangeText={onChangeText}
        />
        {showSend && (
            <TouchableOpacity onPress={onSend} style={styles.sendButton}>
                <Image source={sendIcon} style={styles.sendIcon} />
            </TouchableOpacity>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      padding: 8,
      borderRadius: 100,
      width: 408,
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    input: {
      backgroundColor: COLORS.neutral,
      borderRadius: 100,
      flex: 1,
      paddingHorizontal: 18,
      paddingVertical: 16,
      fontFamily: 'Poppins',
      fontSize: 16,
      color: COLORS.textPrimary,
    },
    sendButton: {
      width: 53,
      height: 53,
      borderRadius: 100,
      backgroundColor: '#1C454F',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: -10,
    },
    sendIcon: {
      width: 25,
      height: 25,
    },
  });