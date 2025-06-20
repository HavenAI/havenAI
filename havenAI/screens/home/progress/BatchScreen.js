import React from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Text, Image } from "react-native";
import firstchat from '../../../assets/firstchat.png'
import fiveconvo from '../../../assets/fiveconvo.png'
import fifteenconvo from '../../../assets/fifteenconvo.png'
import thirtyconvo from '../../../assets/thirtyconvo.png'
import COLORS from '../../../constants/colors.js'

export default function BatchScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Your recent & upcoming badges</Text>
        
        <View style={styles.badgeGrid}>
            <View style={styles.badgeItem}>
                <Image source={firstchat} style={styles.badgeImage} resizeMode="contain" />
                <Text style={styles.badgeText}>First Chat</Text>
            </View>

            <View style={styles.badgeItem}>
                <Image source={fiveconvo} style={styles.badgeImage} resizeMode="contain" />
                <Text style={styles.badgeText}>5 Conversations</Text>
            </View>

            <View style={styles.badgeItem}>
                <Image source={fifteenconvo} style={styles.badgeImage} resizeMode="contain" />
                <Text style={styles.badgeText}>15 Conversations</Text>
            </View>

            <View style={styles.badgeItem}>
                <Image source={thirtyconvo} style={styles.badgeImage} resizeMode="contain" />
                <Text style={styles.badgeText}>30 Conversations</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2A6D74',
      alignItems: 'center',
      paddingTop: 20
    },
    badgeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 10,

    },
    title: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Poppins',
      marginBottom: 30,
      textAlign: 'center',
    },
    badgeItem: {
        width: 160,
        alignItems: 'center',
        marginBottom: 30,
        marginHorizontal: 10,
      },
    badgeImage: {
        width: 80,
        height: 80,
        marginBottom: 8,
      },
    badgeText: {
        fontFamily: 'Poppins',
      fontSize: 16,
      color: COLORS.neutral ,
      textAlign: 'center',
      lineHeight: 18,
    }
  });