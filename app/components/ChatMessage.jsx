import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text, TouchableOpacity, Platform } from 'react-native';
import Markdown from 'react-native-markdown-display';
import BundesligaLogo from '@/assets/images/icons/BundesligaLogo';
import ChattingIconUser from '@/assets/images/icons/ChattingIconUser';
import ChattingIconBundesliga from '@/assets/images/icons/ChattingIconBundesliga';  

// Icons for chat evaluation, copy
import ThumbsUp from '@/assets/images/icons/Toor';
import ThumbsDown from '@/assets/images/icons/RoteKarte';
import VolumeUp from '@/assets/images/icons/Speaker';
import { SvgProps, Svg, G, Path, Defs, ClipPath, Ellipse} from "react-native-svg"
import Copy from '@/assets/images/icons/Copy3';
import * as Speech from 'expo-speech';
import * as Clipboard from 'expo-clipboard';


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
  const iconScale = useRef(new Animated.Value(0.8)).current;//for bot message options

  const [rating, setRating] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Farben aus Ihrem Theme
  const activeColor = Colors[colorScheme ?? 'light'].mainRed;
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

  // Entfernt die unnötigen States und verwendet nur rating
  const handleThumbs = (type) => {
    setRating(current => current === type ? null : type);
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
  
        {/* Icons unterhalb der Bubble */}
        {!isUser && (
          <View style={styles.actionsContainer}>

          <TouchableOpacity onPress={handleReadAloud}>
              <VolumeUp 
                width={16} 
                height={16} 
                color={isSpeaking ? activeColor : inactiveColor}
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleCopy}>
              <Copy
                width={16} 
                height={16} 
                color={isCopied ? activeColor : inactiveColor}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handleThumbs('up')}
              style={styles.iconButton}
            >
              <ThumbsUp
                width={20}
                height={20}
                color={rating === 'up' ? activeColor : inactiveColor}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleThumbs('down')}
              style={styles.iconButton}
            >
              <ThumbsDown
                width={20}
                height={20}
                color={rating === 'down' ? activeColor : inactiveColor}
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
    zIndex: 0,
  },
  userBubble: {
    backgroundColor: '#D20515',
    borderTopRightRadius: 4,
  },
  systemBubble: {
    borderTopLeftRadius: 4,
    marginLeft: 44, // Platz für Bundesliga-Icon
  },

  // Timestamp
  timestamp: {
    color:'#fff',
    fontSize: 11,
    marginTop: 8,
    alignSelf: 'flex-end',
  },

  // Icon Container
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 4,
    paddingRight: 10,
    width: '100%',
  },
  iconButton: {
    paddingHorizontal: 4,
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