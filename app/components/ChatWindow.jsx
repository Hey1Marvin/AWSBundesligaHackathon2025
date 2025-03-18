import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Animated } from 'react-native';
import ChatMessage from './ChatMessage';

const AnimatedTypingDot = ({ delay = 0 }) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim, delay]);

  return (
    <Animated.View style={[styles.typingDot, { transform: [{ scale: scaleAnim }] }]} />
  );
};

const ChatWindow = ({ messages = [] }) => {
  const scrollViewRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // If no messages are provided, use default sample messages
  const displayMessages = messages.length > 0 ? messages : [
    { 
      id: '1', 
      message: "Willkommen zum Bundesliga AI Chat! Wie kann ich dir heute helfen?", 
      type: "system",
      timestamp: new Date(Date.now() - 60000)
    },
    { 
      id: '2', 
      message: "Wann ist das nächste Spiel von Bayern München?", 
      type: "user",
      timestamp: new Date(Date.now() - 45000)
    },
    { 
      id: '3', 
      message: "Bayern München spielt am kommenden Samstag um 15:30 Uhr gegen Borussia Dortmund in der Allianz Arena.", 
      type: "system",
      timestamp: new Date(Date.now() - 30000)
    }
  ];

  return (
    <View style={styles.container}>
      {/* Date Divider */}
      <View style={styles.dateDivider}>
        <View style={styles.dividerLine}></View>
        <Text style={styles.dateText}>Heute</Text>
        <View style={styles.dividerLine}></View>
      </View>

      {/* Messages Container */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {displayMessages.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            message={msg.message} 
            type={msg.type} 
            timestamp={msg.timestamp} 
          />
        ))}
        
        {/* Typing indicator */}
        <View style={styles.typingContainer}>
          <View style={styles.typingBubble}>
            <AnimatedTypingDot delay={0} />
            <AnimatedTypingDot delay={200} />
            <AnimatedTypingDot delay={400} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
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
