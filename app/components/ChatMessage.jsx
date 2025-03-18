import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatMessage = ({ message, type = 'system', timestamp = new Date() }) => {
  const isUser = type === 'user';
  const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Truncate long messages for preview
  const shouldTruncate = message.length > 200;
  const displayMessage = shouldTruncate ? `${message.substring(0, 200)}...` : message;

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.systemContainer]}>
      <View style={[styles.messageWrapper, isUser ? styles.userMessageWrapper : styles.systemMessageWrapper]}>
        {!isUser && (
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBadge}>
              <Icon name="soccer" size={14} color="#ffffff" />
            </View>
          </View>
        )}
        
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.systemBubble]}>
          <Text style={[styles.message, isUser ? styles.userText : styles.systemText]}>
            {displayMessage}
          </Text>
          
          <View style={styles.messageFooter}>
            <Text style={styles.timestamp}>{formattedTime}</Text>
            {isUser && (
              <Icon 
                name="check-all" 
                size={14} 
                color="#ffffff" 
                style={styles.readStatus} 
              />
            )}
          </View>
        </View>
      </View>
      
      {isUser && (
        <View style={styles.userAvatarContainer}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitial}>U</Text>
          </View>
        </View>
      )}
    </View>
  );
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
    maxWidth: '80%',
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
    backgroundColor: '#f0f0f0',
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
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userBubble: {
    backgroundColor: '#e10600',
    borderTopRightRadius: 4,
  },
  systemBubble: {
    backgroundColor: '#1f1f1f',
    borderTopLeftRadius: 4,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#ffffff',
  },
  systemText: {
    color: '#ffffff',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    marginRight: 4,
  },
  readStatus: {
    marginLeft: 2,
  }
});

export default ChatMessage;