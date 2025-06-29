import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { useUser } from '../../../context/UserContext';
import { API_BASE_URL } from '@env';

export default function JourneyScreen() {
    const {uid} = useUser();
    const [joinedDate, setJoinedDate] = useState(null);

    const fetchUserJoinDate = async(uid)=>{
        try{
            const res = await fetch(`${API_BASE_URL}/user/${uid}`)
            const data = await res.json();
            const createdAt = new Date(data.created_at);
            setJoinedDate(createdAt.toDateString());
        }catch(error){
            console.error("Failed to fetch join date", error)

        }
    }
    useEffect(()=>{
        if(uid) fetchUserJoinDate(uid)
    },[uid])

    const formatDate = (dateStr) =>{
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        }); 
    }
  return (
    <View style={styles.container}>
    <Text style={styles.label}>You started your journey on</Text>
    {joinedDate && <Text style={styles.date}>{formatDate(joinedDate)}</Text>}
  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2A6D74',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 120
    },
    label: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Poppins',
      marginBottom: 100,
    },
    date: {
      color: '#8AF0DC',
      fontSize: 48,
      fontFamily: 'Poppins',
    },
  });