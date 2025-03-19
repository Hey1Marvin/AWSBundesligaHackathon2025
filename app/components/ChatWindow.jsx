import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      message: "Willkommen zum Bundesliga AI Chat! Wie kann ich dir heute helfen?", 
      type: "system",
      timestamp: new Date(Date.now() - 60000)
    },
  ]);

  const scrollViewRef = useRef(null);

  // Auto-scroll beim Aktualisieren der Nachrichten
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // API-Call beim Absenden einer Nachricht
  const handleSend = async (text) => {
    // Füge die Nutzer-Nachricht hinzu
    const userMessage = { id: Date.now().toString(), message: text, type: "user", timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);

    // Wähle die URL je nach Plattform (Web: Proxy, Mobile: direkte API)
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

      // Füge die Bot-Antwort als neue Nachricht hinzu
      const botMessage = { id: Date.now().toString(), message: reply, type: "system", timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { id: Date.now().toString(), message: "Fehler beim Abrufen der Antwort", type: "system", timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Datumstrenner */}
      <View style={styles.dateDivider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dateText}>Heute</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Nachrichten-Container */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            message={msg.message} 
            type={msg.type} 
            timestamp={msg.timestamp} 
          />
        ))}
      </ScrollView>

      {/* Chat Input */}
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
