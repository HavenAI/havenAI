import React ,{useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../../../context/UserContext';
import { API_BASE_URL } from '@env';

export default function ProgressScreen() {

  const {token} = useUser();
  const [moneySaved, setMoneySaved]= useState(0)


  const getMoneySaved = async () =>{
    const res = await fetch (`${API_BASE_URL}/log/user/progress`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if(res.ok){
    const data = await res.json();
    setMoneySaved(data["money_saved_usd"])
    
  }else{
    console.log("failed to fetch money saved")
}
  }
  useEffect(()=>{
    getMoneySaved()
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.infoText}>You've saved</Text>
        
        <Text style={styles.amountText}>${moneySaved}</Text>
        
        <Text style={styles.projectedText}>Projected savings</Text>
        
        <View style={styles.savingsContainer}>
          <View style={styles.savingsRow}>
            <Text style={styles.savingsType}>Monthly savings</Text>
            <Text style={styles.savingsAmount}>${moneySaved*30}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.savingsRow}>
            <Text style={styles.savingsType}>Yearly savings</Text>
            <Text style={styles.savingsAmount}>${moneySaved*30*12}</Text>
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
    fontFamily: 'Poppins',
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
