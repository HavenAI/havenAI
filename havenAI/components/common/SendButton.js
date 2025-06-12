import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import sendIcon from '../../assets/send.png'; 
export default function SendButton({onPress}) {
  return (
    <TouchableOpacity style={styles.sendButton} onPress={onPress}>
        <Image source={sendIcon} style={styles.sendIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  