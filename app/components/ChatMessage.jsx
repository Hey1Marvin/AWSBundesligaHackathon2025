import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text, TouchableOpacity, Platform } from 'react-native';
import Markdown from 'react-native-markdown-display';
import BundesligaLogo from '@/assets/images/icons/BundesligaLogo';
import ChattingIconUser from '@/assets/images/icons/ChattingIconUser';
import ChattingIconBundesliga from '@/assets/images/icons/ChattingIconBundesliga';  

// Icons for chat evaluation, copy
//import ThumbsUp from '@/assets/images/icons/ArrowUp';
//import ThumbsDown from '@/assets/images/icons/Statistiken';
//import VolumeUp from '@/assets/images/icons/Spiele';
import { SvgProps, Svg, G, Path, Defs, ClipPath, Ellipse} from "react-native-svg"
//import CopyIcon from '@/assets/images/icons/Copy';
import * as Speech from 'expo-speech';
import * as Clipboard from 'expo-clipboard';


import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Icon Components
const ThumbsUp = ({ filled }) => (
  <Svg width={24} height={24}>
    <Path
      fill={filled ? '#4CAF50' : 'transparent'}
      stroke={filled ? '#4CAF50' : '#666'}
      strokeWidth={1.5}
      d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
    />
  </Svg>
);

const ThumbsDown = ({ filled }) => (
  <Svg width={24} height={24}>
    <Path
      fill={filled ? '#F44336' : 'transparent'}
      stroke={filled ? '#F44336' : '#666'}
      strokeWidth={1.5}
      d="M11 5h8v14h-8l-4-4v-6l4-4zm-2 0H3v14h6l4-4v-6l-4-4z"
    />
  </Svg>
);

const VolumeUp = ({ filled }) => (
  <Svg width={24} height={24}>
    <Path
      fill={filled ? '#2196F3' : 'transparent'}
      stroke={filled ? '#2196F3' : '#666'}
      strokeWidth={1.5}
      d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
    />
  </Svg>
);

const CopyIcon = ({ filled }) => (
  <Svg width={24} height={24}>
    <Path
      fill={filled ? '#FFC107' : 'transparent'}
      stroke={filled ? '#FFC107' : '#666'}
      strokeWidth={1.5}
      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
    />
  </Svg>
);




const ChatMessage = ({ message, type = 'system', timestamp = new Date() }) => {
  // Color Handling
  const colorScheme = useColorScheme();
  const isUser = type === 'user';
  const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Animated values for smooth appearance
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const iconScale = useRef(new Animated.Value(0.8)).current;//for bot message options

  const [thumbsUpActive, setThumbsUpActive] = useState(false);
  const [thumbsDownActive, setThumbsDownActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Farben aus Ihrem Theme
  const activeColor = '#e10600'; // Rot
  const inactiveColor = Colors[colorScheme ?? 'light'].icon; // Grau aus Theme

  useEffect(() => {
    return () => Speech.stop();
  }, []);

  const handleCopy = () => {
    Clipboard.setString(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReadAloud = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(message, {
        language: 'de-DE',
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

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

    //Animation of Bot Message option
    if (!isUser) {
      Animated.spring(iconScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
    
    
    }
  , [fadeAnim, scaleAnim, pulseAnim, isUser, isSpeaking]);

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.systemContainer]}>
      {!isUser && <ChattingIconBundesliga />}
      
      <Animated.View style={styles.messageWrapper}>
        {/* Message Bubble */}
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.systemBubble]}>
          <Markdown style={markdownStyles}>{message}</Markdown>
          <Text style={styles.timestamp}>{formattedTime}</Text>
        </View>
  
        {/* Icons unterhalb der Bubble */}
        {!isUser && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => setThumbsUpActive(!thumbsUpActive)}>
              <ThumbsUp 
                width={16} 
                height={16} 
                color={thumbsUpActive ? activeColor : inactiveColor}
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setThumbsDownActive(!thumbsDownActive)}>
              <ThumbsDown 
                width={16} 
                height={16} 
                color={thumbsDownActive ? activeColor : inactiveColor}
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleReadAloud}>
              <VolumeUp 
                width={16} 
                height={16} 
                color={isSpeaking ? activeColor : inactiveColor}
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleCopy}>
              <CopyIcon 
                width={16} 
                height={16} 
                color={isCopied ? activeColor : inactiveColor}
              />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
  
      {isUser && <ChattingIconUser />}
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
  // Container
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

  // Message Wrapper
  messageWrapper: {
    flexDirection: 'column',
    maxWidth: Platform.select({
      web: '70%',
      default: '80%'
    }),
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  systemMessageWrapper: {
    alignItems: 'flex-start',
  },

  // Bubble
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    flexShrink: 1,
  },
  userBubble: {
    backgroundColor: '#D20515',
    borderTopRightRadius: 4,
  },
  systemBubble: {
    backgroundColor: '#1f1f1f',
    borderTopLeftRadius: 4,
    marginLeft: 44, // Platz für Bundesliga-Icon
  },

  // Timestamp
  timestamp: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 8,
    alignSelf: 'flex-end',
  },

  // Icon Container
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 4,
    marginRight: 8,
    width: '100%',
  },
  iconButton: {
    padding: 4,
    opacity: 0.7,
    ...Platform.select({
      web: {
        transition: 'opacity 0.2s',
        ':hover': {
          opacity: 1,
          transform: [{ scale: 1.1 }]
        }
      }
    })
  },

  // Icons
  botIcon: {
    position: 'absolute',
    left: 8,
    bottom: 0,
    zIndex: 2
  },
  userIcon: {
    marginLeft: 8,
    alignSelf: 'flex-end'
  },

  // Zusätzliche Styles für Konsistenz
  markdownText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#ffffff',
  },
  linkText: {
    color: '#e10600',
    textDecorationLine: 'underline',
  }
});

export default ChatMessage