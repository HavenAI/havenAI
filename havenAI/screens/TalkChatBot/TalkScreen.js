import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../../context/UserContext.js';
import { getAuth } from 'firebase/auth';
import MessageBubble from './MessageBubble';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

export default function TalkScreen() {
  const { nickname } = useUser();
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([
    { type: 'bot', text: `Hi ${nickname}, 🫶 How’s your day going so far? I’m here if you want to talk about anything, big or small.` }
  ]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { type: 'user', text: trimmed }]);
    setInput('');
    scrollToBottom();

    const auth = getAuth();
    const user = auth.currentUser;
    const token = await user.getIdToken();

    setIsBotTyping(true);
    console.log(trimmed)
    try {
      const res = await fetch('http://192.168.1.216:8000/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: trimmed })
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Response failed:", res.status, errorText);
        throw new Error("Backend error");
      }

      const data = await res.json();
      setMessages(prev => [...prev, { type: 'bot', text: data }]);
    } catch (error) {
      console.log("🔥 Error sending message:", error);
      setMessages(prev => [...prev, { type: 'bot', text: "Sorry, something went wrong." }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }} 
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient colors={['#66B2A3', '#CBCEEB']} style={[styles.background,{flex: 1}]}>
          <View style={styles.container}>
            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
              {messages.map((msg, index) => (
                <MessageBubble key={index} message={msg.text} from={msg.type} />
              ))}
              {isBotTyping && <MessageBubble message="Haven AI is typing..." from="bot" />}
            </ScrollView>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Type a message"
                placeholderTextColor="#999"
                returnKeyType="send"
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                <Ionicons name="send" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
