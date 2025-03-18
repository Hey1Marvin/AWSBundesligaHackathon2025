import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, StatusBar, SafeAreaView, Platform } from 'react-native';
import { Link } from 'expo-router';
import bundesligaLogo from '@/assets/images/bundesliga_logo.png';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';

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
      <LinearGradient
        colors={['#0d0d0d', '#1a1a1a']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header with title and logo */}
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
          
          <Image source={bundesligaLogo} resizeMode="contain" style={styles.image} />
        </View>
        
        {/* Chat area */}
        <View style={styles.chatContainer}>
          <ChatWindow />
        </View>
        
        {/* Input area with blur effect background */}
        <View style={styles.inputContainer}>
          {Platform.OS === 'ios' ? (
            <BlurView intensity={30} tint="dark" style={styles.blurEffect}>
              <ChatInput onSend={handleSendMessage} />
            </BlurView>
          ) : (
            <View style={styles.androidInputWrapper}>
              <ChatInput onSend={handleSendMessage} />
            </View>
          )}
        </View>
        
        {/* Pattern overlay for visual interest */}
        <View style={styles.patternOverlay} pointerEvents="none">
          {Array(5).fill().map((_, i) => (
            <View key={i} style={[styles.patternDot, { 
              top: `${10 + Math.random() * 80}%`,
              left: `${Math.random() * 90}%`,
              opacity: 0.1 + Math.random() * 0.15
            }]} />
          ))}
        </View>
      </LinearGradient>
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
  image: {
    width: '50%',
    height: 60,
    alignSelf: 'center',
    marginVertical: 12,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    width: '100%',
    paddingVertical: 8,
  },
  blurEffect: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  androidInputWrapper: {
    backgroundColor: 'rgba(13, 13, 13, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  patternDot: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e10600',
    transform: [{ scale: 1 }],
  },
});