import React, {useState, useRef, useEffect} from 'react';
import { View, StyleSheet , KeyboardAvoidingView, LayoutAnimation, Platform, TouchableWithoutFeedback, ScrollView, Keyboard} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import useKeyboardVisible from '../hooks/useKeyboardVisible';
import COLORS from '../constants/colors';
import InputBubble from './common/InputBubble.js';
import ChatBubble from './common/ChatBubble.js';
import { useUser } from '../context/UserContext.js';
import allQuestions from './data/allQuestions.js';
import UserBubble from './common/UserBubble.js';
import OptionButton from './common/OptionButton.js';
import { getAuth } from 'firebase/auth';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function QuizIntroScreen() {
    const {nickname} = useUser();
    const keyboardVisible = useKeyboardVisible();
    const route = useRoute();
    const { ageRange } = route.params || {};
    const navigation = useNavigation();


    
    const [chatInput, setChatInput] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers,setAnswers] = useState({ageRange: ageRange || null});
    const [isBotTyping, setIsBotTyping] = useState(false);
    const scrollViewRef = useRef();
    
    const [messages, setMessages] = useState([
        { type: 'bot', text: `Hi ${nickname}, welcome to Haven AI!` },
       
      ]);

      useEffect(() => {
        const introMessage = "We’re so glad you’re here. Quitting vaping is tough, but you don’t have to do it alone. Haven is your safe space to talk, reflect, and get support when you need it most. Let’s get to know you a little better so we can support you in the best way possible.💛";
        addTypingAndMessage(introMessage)
      }, []);

    // Animate new messages and scroll
    useEffect(() => {
    const timeout = setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100); // Give layout a bit of breathing room
    return () => clearTimeout(timeout);
}, [messages]);


    const addTypingAndMessage = (text, callback) => {
        setIsBotTyping(true);
        setMessages(prev => [...prev, { type: 'bot', text: 'typing...', typing: true }]);
      
        setTimeout(() => {
          setMessages(prev => {
            const filtered = prev.filter(msg => !msg.typing);
            return [...filtered, { type: 'bot', text }];
          });
          setIsBotTyping(false);
          if (callback) callback(); // if passed
        }, 1200);
      };
      

    const handleBeginQuiz = () => {
        // Logic to handle quiz start
        setQuizStarted(true);
        setMessages(prev => [...prev, { type: 'user', text: 'Begin Quiz' }]);

        const firstQuestion = allQuestions[1];
        if (firstQuestion) {
            addTypingAndMessage(firstQuestion.question, () => setCurrentIndex(1));   
        }
    };

    const proceedToNextQuestion= async ()=>{
        if(currentIndex < allQuestions.length - 1){
            const nextIndex = currentIndex + 1;
            const nextQuestion = allQuestions[nextIndex];
            
            setIsBotTyping(true);
            addTypingAndMessage(nextQuestion.question, () => setCurrentIndex(nextIndex)); 
        }else{
          console.log("\n Quiz completed with answers:\n", answers);

              // Show simulated loading message
        setIsBotTyping(true);
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: 'Setting up your personalized space...' }
        ]);

                        

            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
              const token = await user.getIdToken();

              const mappedPayload = {
                email: user.email,
                goal: answers.cause,
                ageRange: answers.ageRange, // Set this or collect it in the quiz
                vapeType: answers.vapeType,
                nicotineStrength: answers.nicotineStrength,
                craveTime: answers.cravingTime,
                craveTriggers: [answers.stressTriggers],
                vapeFrequency: answers.frequency,
                quitHistory: answers.quitBefore,
                cravingFeeling: answers.cravingFeelings,
                vapingEmotion: answers.vapeFeeling,
                cravingSupport: answers.supportType,
                safeSpots: answers.calmingThings,
                stressTriggers: answers.stressTriggers,
                musicHelp: answers.relaxingSounds,
                mindfulness: answers.mindfulnessUse,
                mindfulnessTypes: answers.mindfulnessDetails,
                aiTone: answers.tone,
                aiTalkative: answers.talkLevel,
                checkInFrequency: answers.checkinFrequency,
                openNotes: answers.openNotes || ""
              };

              try{
                const res = await fetch("http://192.168.1.216:8000/user/onboarding", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(mappedPayload),
                });
  
                const data = await res.json();
                console.log("\nUser Onboarding Response:\n" + JSON.stringify(data, null, 2));

                if (!res.ok) {
                  console.error("Server responded with an error:", res.status, data);
                  return;
                }
                setIsBotTyping(false);
                navigation.replace("Home", { fresh: true });

              // Optional: log each missing field (if FastAPI response is structured this way)
              if (data.detail && Array.isArray(data.detail)) {
                data.detail.forEach((item, i) => {
                  console.log(` Missing Field [${i + 1}]:`, item.loc?.[1] || "(unknown field)");
                });
              }
            }catch (error) {
                console.error(" Network Error during onboarding:", error);
            }
        }
      }

    }

    const handleOptionSelect = (option)=>{
        const currentQuestion = allQuestions[currentIndex];
        setAnswers({...answers,[currentQuestion.id]: option});
        setMessages(prev => [...prev, { type: 'user', text: option }]);
        proceedToNextQuestion();
    };


    const handleMessageSend = () =>{
        if (chatInput.trim()) {
            // Add user message to chat
            const userText = chatInput.trim();
            setMessages(prev => [...prev, { type: 'user', text: userText }]);
            
            if (quizStarted && currentIndex > 0){
                const currentQuestion = allQuestions[currentIndex];
                setAnswers({...answers, [currentQuestion.id]: userText});
                proceedToNextQuestion();
            }
            setChatInput('');
          }
    };

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient colors={['#66B2A3', '#CBCEEB']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.background}>
                <View style = {styles.container}>
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={[styles.scrollContent, {flexGrow: 1}]}
                        keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive"
                        >
                        {messages.map((msg, idx) =>{
                            const key = `msg-${idx}`;
                            if (msg.typing) {
                                return (
                                  <ChatBubble
                                    key={key}
                                    message="Haven AI is typing..."
                                    variant="large"
                                    align="left"
                                  />
                                );
                              }
                            return msg.type === 'bot' ? (
                                <ChatBubble key={key} message={msg.text} variant="large" align="left" />
                            ) : (
                            <UserBubble key={key} message={msg.text} />
                            )
                        })}
                    
                        {!quizStarted && !isBotTyping && (
                                <OptionButton label="Begin Quiz" onPress={handleBeginQuiz} fullWidth={false}></OptionButton>
                        )}
                        {quizStarted && !isBotTyping &&
                            currentIndex > 0 && 
                            allQuestions[currentIndex]?.options?.map((opt, idx) => (
                                <OptionButton key={idx} label={opt} onPress={() => handleOptionSelect(opt)} />
                            ))}
                    </ScrollView>
                    
                    {/* Input Field */}
                    <View style={styles.inputWrapper}>
                        <InputBubble
                        value={chatInput}
                        onChangeText={setChatInput}
                        placeholder="Type a message"
                        onSend={handleMessageSend}
                        showSend={true}
                        />
                    </View>
                </View>
            </LinearGradient>
         </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingTop: 50,
      paddingHorizontal: 10,
      
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingTop: 56,
        paddingHorizontal: 16,
        paddingBottom: 24,
        
    },
    inputWrapper: {
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingBottom: 10,
        backgroundColor: 'transparent',
    },
    optionButton: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 24,
        marginBottom: 16,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.neutral,
      },
      optionText: {
        fontFamily: 'Poppins',
        fontSize: 15,
        color: COLORS.textPrimary,
      },
  });