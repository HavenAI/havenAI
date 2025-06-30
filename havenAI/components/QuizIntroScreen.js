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
import { API_BASE_URL } from '@env';

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
    const [multiSelectPending, setMultiSelectPending] = useState(false);

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
        setIsBotTyping(true);
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: 'Setting up your personalized space...' }
        ]);

                        

            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
              const token = await user.getIdToken();
              const flatten = (value) =>
                Array.isArray(value) ? value.join(", ") : value;
              
              const mappedPayload = {
                email: user.email,
                nickname: nickname,
                goal: flatten(answers.goal),
                ageRange: flatten(answers.ageRange),
                vapeType: flatten(answers.vapeType),
                nicotineStrength: flatten(answers.nicotineStrength),
                craveTime: flatten(answers.cravingTime),
                craveTriggers: [flatten(answers.cause)],
                vapeFrequency: flatten(answers.frequency),
                vapeRefill: flatten(answers.vapeRefill),
                expense: flatten(answers.expense),
                quitHistory: flatten(answers.quitBefore),
                cravingFeeling: flatten(answers.cravingFeelings),
                cravingSupport: flatten(answers.supportType),
                safeSpots: flatten(answers.calmingThings),
                stressTriggers: flatten(answers.stressTriggers),
                musicHelp: flatten(answers.relaxingSounds),
                mindfulness: flatten(answers.mindfulnessUse),
                mindfulnessTypes: flatten(answers.mindfulnessDetails),
                aiTone: flatten(answers.tone),
                aiTalkative: flatten(answers.talkLevel),
                checkInFrequency: flatten(answers.checkinFrequency),
                quitMethod: flatten(answers.quitMethod),
                futureSelfMessage: flatten(answers.futureSelfMessage),
              };
              
              try{
                const res = await fetch(`${API_BASE_URL}/user/onboarding`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(mappedPayload),
                });
  
                const data = await res.json();
             

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
        const isMulti = currentQuestion.multiSelect;
        const currentAnswer = answers[currentQuestion.id] || (isMulti? [] : null);

        if(isMulti){
          let updatedAnswers;
          if(currentAnswer.includes(option)){
            updatedAnswers = currentAnswer.filter(o => o !== option)
          }else{
            updatedAnswers = [...currentAnswer, option]
          }
          setAnswers(prev=>({
            ...prev,
            [currentQuestion.id]: updatedAnswers
          }))
          setMultiSelectPending(true);
        } else{
          setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: option
          }));
          setMessages(prev => [...prev, { type: 'user', text: option }]);
          proceedToNextQuestion();
        }
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
                          allQuestions[currentIndex]?.options?.map((opt, idx) => {
                            const isSelected = allQuestions[currentIndex].multiSelect
                              ? (answers[allQuestions[currentIndex].id] || []).includes(opt)
                              : answers[allQuestions[currentIndex].id] === opt;
                            return(
                              <OptionButton
                              key={idx}
                              label={opt}
                              selected={isSelected}
                              onPress={() => handleOptionSelect(opt)}  // 👈 this calls your function
                            />
                            );
                        })}

                        {quizStarted && !isBotTyping &&
                            currentIndex > 0 && 
                            allQuestions[currentIndex]?.multiSelect && multiSelectPending && (
                              <OptionButton
                                label="Submit Selection"
                                variant="submit"
                                onPress={() => {
                                  const currentQuestion = allQuestions[currentIndex];
                                  const selected = answers[currentQuestion.id] || [];
                                  setMessages(prev => [...prev, { type: 'user', text: selected.join(', ') }]);
                                  setMultiSelectPending(false);
                                  proceedToNextQuestion();
                                }} />
                            )}
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