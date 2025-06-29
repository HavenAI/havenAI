import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function RecommendedSection() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended</Text>
      
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Meditation')}
      >
        <LinearGradient
          colors={['#1E5A60', '#2A9D8F']}
          style={styles.recommendedCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.cardText}>Practice Meditation</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F0E3', // Creamy off-white
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#264653', // Darker teal/blue
    marginBottom: 15,
  },
  recommendedCard: {
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100, // Increased height
  },
  cardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
