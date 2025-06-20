import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.infoText}>You've saved</Text>
        
        <Text style={styles.amountText}>$25.00</Text>
        
        <Text style={styles.projectedText}>Projected savings</Text>
        
        <View style={styles.savingsContainer}>
          <View style={styles.savingsRow}>
            <Text style={styles.savingsType}>Monthly savings</Text>
            <Text style={styles.savingsAmount}>$60.83</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.savingsRow}>
            <Text style={styles.savingsType}>Yearly savings</Text>
            <Text style={styles.savingsAmount}>$730.00</Text>
          </View>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A6D74',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  infoText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 16,
    textAlign: 'center',
  },
  amountText: {
    color: '#66CDAA',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 48,
    marginBottom: 30,
  },
  projectedText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginBottom: 20,
  },
  savingsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  savingsType: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  savingsAmount: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 16,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
  },
  dotIndicator: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
});
