import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';
import { API_BASE_URL } from '@env';
import BottomTabBar from '../../components/common/BottomTabBar';
import BackIcon from '../../assets/BackIcon.png';

export default function FeedbackScreen() {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const { token } = useUser();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeBottomTab, setActiveBottomTab] = useState('Settings');

  const sendFeedback = async () => {
    if (!message.trim()) {
      Alert.alert('Please enter feedback before submitting.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/feedback/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, rating }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Feedback sent successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.detail || 'Something went wrong.');
      }
    } catch (err) {
      Alert.alert('Network Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C454F" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={BackIcon} style={styles.backIcon} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback</Text>
      </View>

      {/* Feedback Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Your Feedback</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Let us know what you think..."
          value={message}
          onChangeText={setMessage}
        />

        <Text style={styles.label}>Rate Us</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
              <Text style={i <= rating ? styles.starFilled : styles.star}>★</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={sendFeedback}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Bar */}
      <BottomTabBar
        activeBottomTab={activeBottomTab}
        setActiveBottomTab={setActiveBottomTab}
        navigation={navigation}
        insets={insets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4EF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C454F',
    height: 64,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFF',
    resizeMode: 'contain',
    marginRight: 6,
  },
  backText: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Poppins',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
    fontSize: 20,
    fontFamily: 'Poppins',
    color: '#FFF',
  },
  form: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1C454F',
  },
  input: {
    height: 120,
    borderWidth: 1,
    borderColor: '#B5A9DD',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  star: {
    fontSize: 28,
    color: '#C3BFD9',
    marginRight: 8,
  },
  starFilled: {
    fontSize: 28,
    color: '#8B80BA',
    marginRight: 8,
  },
  button: {
    backgroundColor: '#62569A',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
