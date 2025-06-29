import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Text, Image } from "react-native";
import firstchat from '../../../assets/firstchat.png'
import fiveconvo from '../../../assets/fiveconvo.png'
import fifteenconvo from '../../../assets/fifteenconvo.png'
import thirtyconvo from '../../../assets/thirtyconvo.png'
import COLORS from '../../../constants/colors.js'
import { useUser } from '../../../context/UserContext.js';
import { API_BASE_URL } from '@env';

export default function BatchScreen() {
  const {token} = useUser();
  const[interventionsCount, setInterventionsCount] = useState(0);

  const getInterventionCount = async () => {
    const res = await fetch (`${API_BASE_URL}/interventions/count`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if(res.ok){
    const data = await res.json();
    setInterventionsCount(data["count"])
    
  }else{
    console.log("failed to fetch streak count")
  }
}
useEffect(()=>{
  getInterventionCount()
},[])

const badges = [
  { threshold: 1, label: "First Chat", image: firstchat },
  { threshold: 5, label: "5 Conversations", image: fiveconvo },
  { threshold: 15, label: "15 Conversations", image: fifteenconvo },
  { threshold: 30, label: "30 Conversations", image: thirtyconvo }
];
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Your recent & upcoming badges</Text>
        
        <View style={styles.badgeGrid}>
            {badges.map((badge, index) => {
          const unlocked = interventionsCount >= badge.threshold;
          return (
            <View key={index} style={styles.badgeItem}>
              <Image
                source={badge.image}
                style={[
                  styles.badgeImage,
                  { opacity: unlocked ? 1 : 0.3 }
                ]}
                resizeMode="contain"
              />
              <Text style={styles.badgeText}>{badge.label}</Text>
            </View>
          );
        })}
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