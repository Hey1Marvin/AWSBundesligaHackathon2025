import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, StatusBar, SafeAreaView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import ChatWindow from '../components/ChatWindow';

export default function AIChatPage() {
  const [showInfo, setShowInfo] = useState(false);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Link href="/" style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#ffffff" />
            </Link>
            
            <View style={styles.titleContainer}>
              <Text style={styles.headerText}>Bundesliga Chat</Text>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>AI</Text>
              </View>
            </View>
            
            <Pressable 
              style={styles.infoButton} 
              onPress={() => setShowInfo(!showInfo)}
              hitSlop={10}
            >
              <Ionicons name="information-circle-outline" size={24} color="#ffffff" />
            </Pressable>
          </View>
          
          {showInfo && (
            <View style={styles.infoPanel}>
              <Text style={styles.infoText}>
                Stellen Sie dem Bundesliga-KI-Assistenten beliebige Fragen zu Spielen, Spielern, Statistiken und mehr!
              </Text>
            </View>
          )}
          
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
    backgroundColor: '#0d0d0d',
  },
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#0d0d0d',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
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
  infoButton: {
    padding: 8,
  },
  infoPanel: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  infoText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    lineHeight: 20,
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

