import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function RecommendedSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended</Text>
      
      <TouchableOpacity style={styles.recommendedCard}>
        <Text style={styles.cardText}>Practice Meditation</Text>
        <View style={styles.avatarContainer}>
         
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1D3557',
    marginBottom: 15,
  },
  recommendedCard: {
    backgroundColor: '#2A9D8F',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
  },
  cardText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: '#FFFFFF',
  },
 
});
