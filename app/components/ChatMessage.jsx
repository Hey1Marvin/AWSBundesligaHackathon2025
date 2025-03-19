import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import Markdown from 'react-native-markdown-display';

import BundesligaLogo from '@/assets/images/icons/BundesligaLogo';
import ChattingIconUser from '@/assets/images/icons/ChattingIconUser';
import ChattingIconBundesliga from '@/assets/images/icons/ChattingIconBundesliga';  

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
          <ChattingIconBundesliga/>
        )}

        <View style={[styles.bubble, isUser ? styles.userBubble : styles.systemBubble, { backgroundColor: isUser ? '#D20515' : Colors[colorScheme ?? 'light'].answerBack }]}>
          {/* Render full message using Markdown */}
          <Markdown
            style={{
              body: {
                ...markdownStyles.body,
                color: isUser ? '#FFFFFF' : Colors[colorScheme ?? 'light'].answerTint,
              },
              heading1: markdownStyles.heading1,
              link: markdownStyles.link,
            }}
          >
            {message}
          </Markdown>
          <Animated.Text style={[styles.timestamp, 
          {
            color: isUser ? '#FFFFFF' : Colors[colorScheme ?? 'light'].tint,
          }]}>{formattedTime}</Animated.Text>
        </View>
      </Animated.View>

      {isUser && (
        <ChattingIconUser/>
      )}
    </View>
  );
};

const markdownStyles = {
  body: {
    fontSize: 16,
    lineHeight: 22,
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
    zIndex: 0,
  },
  userBubble: {
    backgroundColor: '#D20515',
    borderTopRightRadius: 4,
    marginHorizontal: 8,
  },
  systemBubble: {
    borderTopLeftRadius: 4,
    marginHorizontal: 8,
  },
  timestamp: {
    color:'#fff',
    fontSize: 11,
    marginTop: 8,
    alignSelf: 'flex-end',
  },
});

export default ChatMessage;