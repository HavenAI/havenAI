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

export default function QuizIntroScreen() {
    const {nickname} = useUser();
    const keyboardVisible = useKeyboardVisible();
    
    const [chatInput, setChatInput] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers,setAnswers] = useState({});
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

    const proceedToNextQuestion=()=>{
        if(currentIndex < allQuestions.length - 1){
            const nextIndex = currentIndex + 1;
            const nextQuestion = allQuestions[nextIndex];
            
            setIsBotTyping(true);
            addTypingAndMessage(nextQuestion.question, () => setCurrentIndex(nextIndex)); 
        }else{
            console.log('Quiz completed with answers:', answers);
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