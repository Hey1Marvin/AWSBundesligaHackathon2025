import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, StatusBar, SafeAreaView, Platform } from 'react-native';

import ChatWindow from '../components/ChatWindow';
import BundesligaLogo from '@/assets/images/icons/BundesligaLogo';

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

