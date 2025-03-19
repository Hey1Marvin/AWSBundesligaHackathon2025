import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, StatusBar, SafeAreaView, Platform } from 'react-native';
import { Link } from 'expo-router';
<<<<<<< HEAD
import { Ionicons } from '@expo/vector-icons';

import ChatWindow from '../components/ChatWindow';
=======
import bundesligaLogo from '@/assets/images/icons/BundesligaLogo';
import { Ionicons } from '@expo/vector-icons';

import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import BundesligaLogo from '@/assets/images/icons/BundesligaLogo';
>>>>>>> bde7a4bba418285d3bf5e211e80986b85d6e58b7

export default function AIChatPage() {
  const [showInfo, setShowInfo] = useState(false);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
              <BundesligaLogo/>
          </View>
        </View>
        
        <View style={styles.chatContainer}>
          <ChatWindow />
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

