import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import ChatMessage from './ChatMessage';

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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: '/api/placeholder/32/32' }} 
            style={styles.logo} 
            alt="Bundesliga Logo" 
          />
          <Text style={styles.headerTitle}>Bundesliga Chat</Text>
        </View>
        <View style={styles.headerActions}>
          <View style={styles.badgeOnline}></View>
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>

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
        
        {/* Typing indicator - can be conditionally rendered */}
        <View style={styles.typingContainer}>
          <View style={styles.typingBubble}>
            <View style={styles.typingDot}></View>
            <View style={[styles.typingDot, styles.typingDotMiddle]}></View>
            <View style={styles.typingDot}></View>
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
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeOnline: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4caf50',
    marginRight: 6,
  },
  statusText: {
    color: '#4caf50',
    fontSize: 14,
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 44,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e10600',
    marginHorizontal: 2,
    opacity: 0.6,
  },
  typingDotMiddle: {
    opacity: 0.9,
  },
});

export default ChatWindow;