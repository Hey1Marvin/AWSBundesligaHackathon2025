import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Animated, Platform } from 'react-native';
import ChatMessage from './ChatMessage';
import SoccerBall from '../../assets/images/icons/Ball';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import ChatInput from './ChatInput';
import FAQs from './FAQs';
import SoccerBall from '../../assets/images/icons/Ball'; // Adjust the path as needed
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// AnimatedTypingDot component for the bot's typing indicator
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

const ChatWindow = () => {
  // No initial messages so that FAQs are visible until a user sends a message.
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
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

    // Choose API URL based on platform.
    const apiUrl = Platform.OS === 'web'
      ? 'http://localhost:3001/proxy/hackaton/chat'
      : 'https://hdeepi3xgi.execute-api.eu-central-1.amazonaws.com/hackaton/chat';

    const promptBody = { prompt: text };

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
      
      // Post the bot reply as a system message.
      const botMessage = { 
        id: Date.now().toString(), 
        message: reply, 
        type: "system", 
        timestamp: new Date() 
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

  // Show FAQs only if no user message has been sent.
  const showFAQs = !messages.some(msg => msg.type === 'user');

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {showFAQs && <FAQs onSelect={handleFAQSelect} />}
        {messages.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            message={msg.message} 
            type={msg.type} 
            timestamp={msg.timestamp} 
          />
        ))}
        {isTyping && (
          <View style={styles.typingContainer}>
            <View style={styles.typingBubble}>
              <AnimatedTypingDot delay={0} />
              <AnimatedTypingDot delay={200} />
              <AnimatedTypingDot delay={400} />
            </View>
          </View>
        )}
      </ScrollView>
      <ChatInput onSend={handleSend} />
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
    paddingBottom: 20,
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  typingBubble: {
    backgroundColor: '#1f1f1f',
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
