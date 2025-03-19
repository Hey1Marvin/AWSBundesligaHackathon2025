import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, StatusBar, SafeAreaView, Platform } from 'react-native';
import { Link } from 'expo-router';
import bundesligaLogo from '@/assets/images/icons/BundesligaLogo';
import { Ionicons } from '@expo/vector-icons';

import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import BundesligaLogo from '@/assets/images/icons/BundesligaLogo';

export default function AIChatPage() {
  const [showInfo, setShowInfo] = useState(false);
  
  // Sample function to handle sending messages
  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
    // Here you would typically update your message state
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header with title and logo */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
              <BundesligaLogo/>
          </View>
        </View>
        
        {/* Chat area */}
        <View style={styles.chatContainer}>
          <ChatWindow />
        </View>
        
        {/* Input area without background */}
        <View style={styles.inputContainer}>
          <ChatInput onSend={handleSendMessage} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingTop: 35,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  badgeContainer: {
    backgroundColor: '#e10600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    width: '100%',
    paddingVertical: 8,
  },
});

