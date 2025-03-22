import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Animated, Platform } from 'react-native';
import ChatMessage from './ChatMessage';
import QuizMessage from './QuizMessage';
import SoccerBall from '../../assets/images/icons/Ball';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import ChatInput from './ChatInput';
import FAQs from './FAQs';
import { getQuizQuestion } from './QuizService';

const AnimatedTypingDot = ({ delay = 0 }) => {
  const colorScheme = useColorScheme();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation, delay]);

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  return (
    <Animated.View 
      style={{ 
        transform: [{ scale }], 
        marginHorizontal: 4,
        height: 16,
        width: 16,
      }}
    >
      <SoccerBall 
        key="soccer-ball" 
        width={16} 
        height={16} 
        color={Colors[colorScheme ?? 'light'].icon}
      />
    </Animated.View>
  );
};

// Helper function to detect if a message contains media requests
const detectMediaRequests = (text) => {
  const imageRequestPatterns = [
    /zeig mir (ein bild|eine grafik|ein foto|eine karte)/i,
    /kannst du (ein bild|eine grafik|ein foto|eine karte) (zeigen|anzeigen)/i,
    /ich würde gerne (ein bild|eine grafik|ein foto|eine karte) sehen/i,
    /hast du (ein bild|eine grafik|ein foto|eine karte)/i,
    /show me (an image|a picture|a photo|a chart|a map)/i,
    /can you show (an image|a picture|a photo|a chart|a map)/i
  ];
  
  return imageRequestPatterns.some(pattern => pattern.test(text));
};

// Helper to parse AI response for potential media content
const parseMediaContent = (text) => {
  // Check if response indicates it might have had an image
  const imageIndicators = [
    /Hier ist (ein Bild|eine Grafik|ein Foto|eine Karte)/i,
    /Ich kann dir leider kein Bild/i,
    /Here is (an image|a picture|a photo|a chart|a map)/i,
    /I cannot show you (an image|a picture|a photo)/i
  ];
  
  if (imageIndicators.some(indicator => indicator.test(text))) {
    return {
      type: 'image',
      url: 'https://www.bundesliga.com/assets/liveticker/images/placeholder-image.jpg',
      caption: 'Dieses Bild konnte nicht geladen werden'
    };
  }
  
  return null;
};

const ChatWindow = () => {
  // No initial messages so that FAQs are visible until a user sends a message.
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [quizQuestions, setQuizQuestions] = useState([]);
  const scrollViewRef = useRef(null);

  // Auto-scroll when messages update
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // API call when sending a message.
  const handleSend = async (text) => {
    // Add the user message.
    const userMessage = { 
      id: Date.now().toString(), 
      message: text, 
      type: "user", 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Detect if the user is requesting media content
    const containsMediaRequest = detectMediaRequests(text);

    // Choose API URL based on platform.
    const apiUrl = Platform.OS === 'web'
      ? 'http://localhost:3001/proxy/hackaton/chat'
      : 'https://hdeepi3xgi.execute-api.eu-central-1.amazonaws.com/hackaton/chat';

    // Add media request flag to prompt if needed
    const promptBody = { 
      prompt: text,
      includeMedia: containsMediaRequest 
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(promptBody)
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      const reply = data?.output?.message?.content[0]?.text;
      
      // Check if the response should include media
      const mediaContent = containsMediaRequest ? parseMediaContent(reply) : null;
      
      // Post the bot reply as a system message.
      const botMessage = { 
        id: Date.now().toString(), 
        message: reply, 
        type: "system", 
        timestamp: new Date(),
        mediaContent: mediaContent
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        id: Date.now().toString(), 
        message: "Fehler beim Abrufen der Antwort", 
        type: "system", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  // When an FAQ is clicked, send it as a user message.
  const handleFAQSelect = (question) => {
    handleSend(question);
  };

  // Handle Quiz Start
  const handleQuizStart = () => {
    setIsQuizActive(true);
    setQuizScore({ correct: 0, total: 0 });
    
    // Track which questions have been asked to avoid repetition
    setQuizQuestions([]);
    
    // Add a system message announcing the quiz
    const quizStartMessage = {
      id: Date.now().toString(),
      message: "Bundesliga Quiz! Lass uns dein Wissen testen mit ein paar Fragen über den deutschen Fußball.",
      type: "system",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, quizStartMessage]);
    
    // Send the first quiz question
    setTimeout(() => {
      sendQuizQuestion();
    }, 1000);
  };

  // Send a quiz question
  const sendQuizQuestion = () => {
    const quizQuestion = getQuizQuestion(quizQuestions);
    
    // Track this question to avoid repetition
    setQuizQuestions(prev => [...prev, quizQuestion.question]);
    
    const quizMessage = {
      id: Date.now().toString(),
      type: "quiz",
      question: quizQuestion.question,
      options: quizQuestion.options,
      correctAnswer: quizQuestion.correctAnswer,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, quizMessage]);
  };

  // Handle quiz answer selection
  const handleAnswerSelected = (selectedIndex, isCorrect) => {
    // Update the score
    setQuizScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    
    // Determine if we should send another question or end the quiz
    if (quizScore.total < 4) { // limit to 5 questions per quiz
      // Send next question after a delay
      setTimeout(() => {
        sendQuizQuestion();
      }, 2000);
    } else {
      // End the quiz and show results
      setTimeout(() => {
        const finalScore = {
          correct: quizScore.correct + (isCorrect ? 1 : 0),
          total: quizScore.total + 1
        };
        
        const quizEndMessage = {
          id: Date.now().toString(),
          message: `Quiz beendet! Du hast ${finalScore.correct} von ${finalScore.total} Fragen richtig beantwortet.`,
          type: "system",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, quizEndMessage]);
        setIsQuizActive(false);
      }, 2000);
    }
  };

  // Show FAQs only if no user message has been sent.
  const showFAQs = !messages.some(msg => msg.type === 'user');
  const colorScheme = useColorScheme();
  
  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {showFAQs && <FAQs onSelect={handleFAQSelect} />}
        {messages.map((msg) => {
          if (msg.type === "quiz") {
            return (
              <QuizMessage
                key={msg.id}
                question={msg.question}
                options={msg.options}
                correctAnswer={msg.correctAnswer}
                onAnswerSelected={handleAnswerSelected}
                timestamp={msg.timestamp}
              />
            );
          }
          return (
            <ChatMessage 
              key={msg.id} 
              message={msg.message} 
              type={msg.type} 
              timestamp={msg.timestamp}
              mediaContent={msg.mediaContent} 
            />
          );
        })}
        {isTyping && (
          <View style={styles.typingContainer}>
            <View style={[styles.typingBubble, { backgroundColor: Colors[colorScheme ?? 'light'].eleColor }]}>
              <AnimatedTypingDot delay={0} />
              <AnimatedTypingDot delay={200} />
              <AnimatedTypingDot delay={400} />
            </View>
          </View>
        )}
      </ScrollView>
      <ChatInput onSend={handleSend} onQuizStart={handleQuizStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333',
  },
  dateText: {
    color: '#999999',
    fontSize: 12,
    marginHorizontal: 8,
    textTransform: 'uppercase',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 8,
    paddingBottom: 95,
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  typingBubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 44,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e10600',
    marginHorizontal: 3,
  },
});

export default ChatWindow;