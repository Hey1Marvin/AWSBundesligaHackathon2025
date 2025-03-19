import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Markdown from 'react-native-markdown-display';

import BundesligaLogo from '@/assets/images/icons/BundesligaLogo';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const ChatMessage = ({ message, type = 'system', timestamp = new Date() }) => {
  // Color Handling
  const colorScheme = useColorScheme();
  const isUser = type === 'user';
  const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Animated values for smooth appearance
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    if (!isUser) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [fadeAnim, scaleAnim, pulseAnim, isUser]);

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.systemContainer]}>
      <Animated.View
        style={[
          styles.messageWrapper,
          isUser ? styles.userMessageWrapper : styles.systemMessageWrapper,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {!isUser && (
          <View style={[styles.avatarContainer, { backgroundColor: Colors[colorScheme ?? 'light'].eleColor }]}>
            <View style={styles.logoBack}>
              <BundesligaLogo />
            </View>
          </View>
        )}

        <View style={[styles.bubble, isUser ? styles.userBubble : styles.systemBubble]}>
          {/* Render full message using Markdown */}
          <Markdown style={markdownStyles}>
            {message}
          </Markdown>
          <Animated.Text style={styles.timestamp}>{formattedTime}</Animated.Text>
        </View>
      </Animated.View>

      {isUser && (
        <View style={styles.userAvatarContainer}>
          <View style={styles.userAvatar}>
            <Animated.Text style={styles.userInitial}>U</Animated.Text>
          </View>
        </View>
      )}
    </View>
  );
};

const markdownStyles = {
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: '#ffffff',
  },
  heading1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  link: {
    color: '#e10600',
    textDecorationLine: 'underline',
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  systemContainer: {
    justifyContent: 'flex-start',
  },
  // Limit message width to 70% of screen width
  messageWrapper: {
    flexDirection: 'row',
    maxWidth: Dimensions.get('window').width * 0.7,
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  systemMessageWrapper: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logoBack: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    flexShrink: 1,
  },
  userBubble: {
    backgroundColor: '#e10600',
    borderTopRightRadius: 4,
  },
  systemBubble: {
    backgroundColor: '#1f1f1f',
    borderTopLeftRadius: 4,
  },
  timestamp: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  userAvatarContainer: {
    marginLeft: 8,
    alignSelf: 'flex-end',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitial: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatMessage;
