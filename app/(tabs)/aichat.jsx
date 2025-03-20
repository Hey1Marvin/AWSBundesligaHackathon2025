import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';

import ChatWindow from '../components/ChatWindow';
import BundesligaLogo from '@/assets/images/icons/BundesligaLogo';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AIChatPage() {
  const colorScheme = useColorScheme();
  
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: Colors[colorScheme ?? 'light'].background },
      ]}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header now has no extra padding so its height exactly matches the BundesligaLogo */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <BundesligaLogo style={styles.logo} />
          </View>
        </View>
        
        <View
          style={[
            styles.chatContainer,
            { backgroundColor: Colors[colorScheme ?? 'light'].background },
          ]}
        >
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
    // Remove padding so the header exactly matches the logo's height
    backgroundColor: 'transparent',
    marginTop: 40,
    marginBottom: 10,
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Set the logo size here. The header’s height will be determined by this.
  logo: {
    height: 80, // adjust this value as needed to make the logo (and header) bigger
    resizeMode: 'contain',
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
