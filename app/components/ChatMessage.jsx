import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Markdown from 'react-native-markdown-display';

const ChatMessage = ({ message, type = 'system', timestamp = new Date() }) => {
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
          <View style={styles.avatarContainer}>
            <Animated.View style={[styles.avatarBadge, { transform: [{ scale: pulseAnim }] }]}>
              <Icon name="soccer" size={14} color="#ffffff" />
            </Animated.View>
          </View>
        )}

        <View style={[styles.bubble, isUser ? styles.userBubble : styles.systemBubble]}>
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
  // Customize headings, links, etc.
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
  // Limit the message wrapper width to 70% of the screen
  messageWrapper: {
    flexDirection: 'row',
    maxWidth: '70%',
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
    backgroundColor: '#282828',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  avatarBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e10600',
    justifyContent: 'center',
    alignItems: 'center',
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
    // Ensure the text wraps properly
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
