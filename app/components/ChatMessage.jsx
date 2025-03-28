import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text, TouchableOpacity, Platform, Image } from 'react-native';
import Markdown from 'react-native-markdown-display';
import BundesligaLogo from '@/assets/images/icons/BundesligaLogo';
import ChattingIconUser from '@/assets/images/icons/ChattingIconUser';
import ChattingIconBundesliga from '@/assets/images/icons/ChattingIconBundesliga';  

// icons for chat evaluation, copy
import ThumbsUp from '@/assets/images/icons/Toor';
import ThumbsDown from '@/assets/images/icons/RoteKarte';
import VolumeUp from '@/assets/images/icons/speaker';
import Share from '@/assets/images/icons/Share';
import Copy from '@/assets/images/icons/Copy';
import * as Speech from 'expo-speech';
import * as Clipboard from 'expo-clipboard';


import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { ShareService } from '../components/shareService'; // for share option



const ChatMessage = ({ message, type = 'system', timestamp = new Date(), mediaContent = null }) => {
  // Color Handling
  const colorScheme = useColorScheme();
  const isUser = type === 'user';
  const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Animated values for smooth appearance
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const iconScale = useRef(new Animated.Value(0.8)).current;

  const [rating, setRating] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Farben aus Ihrem Theme
  const activeColor = Colors[colorScheme ?? 'light'].mainRed;
  const inactiveColor = Colors[colorScheme ?? 'light'].icon; // Grau aus Theme

  useEffect(() => {
    return () => Speech.stop();
  }, []);

  const handleCopy = () => {
    Clipboard.setString(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const handleShare = async () => {
    try {
      setIsShared(true);
      ShareService.setMessage(message);
      
      // If media content, add it to share 
      if (mediaContent && mediaContent.url) {
        ShareService.setMedia(mediaContent);
      }
      
      await ShareService.share();
      setTimeout(() => setIsShared(false), 1500);
      
    } catch (error) {
      console.log("shared")
      setIsShared(false)
      if (!error.message.includes('Aborted')) {
        setIsShared(false);
      }
    }
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

  const handleThumbs = (type) => {
    setRating(current => current === type ? null : type);
  };

  const handleImageError = () => {
    setImageError(true);
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
          
          {!isUser && mediaContent && mediaContent.type === 'image' && !imageError && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: mediaContent.url }}
                style={styles.messageImage}
                resizeMode="contain"
                onError={handleImageError}
              />
              {mediaContent.caption && (
                <Text style={[styles.imageCaption, { color: Colors[colorScheme ?? 'light'].answerTint }]}>
                  {mediaContent.caption}
                </Text>
              )}
            </View>
          )}
          
          <Animated.Text style={[styles.timestamp, 
          {
            color: isUser ? '#FFFFFF' : Colors[colorScheme ?? 'light'].tint,
          }]}>{formattedTime}</Animated.Text>
        </View>
  
        {!isUser && (
          <View style={styles.actionsContainer}>

            <TouchableOpacity onPress={handleShare}>
              <Share 
                width={16} 
                height={16} 
                color={isShared ? activeColor : inactiveColor}
              />
            </TouchableOpacity>

          <TouchableOpacity onPress={handleReadAloud}>
              <VolumeUp 
                width={18} 
                height={18} 
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
                width={16}
                height={16}
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
    marginLeft: 20,
  },
  imageContainer: {
    marginTop: 12,
    marginBottom: 8,
    alignItems: 'center',
    width: '100%',
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  imageCaption: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  imageContainer: {
    marginTop: 12,
    marginBottom: 8,
    alignItems: 'center',
    width: '100%',
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  imageCaption: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  timestamp: {
    color:'#fff',
    fontSize: 11,
    marginTop: 8,
    alignSelf: 'flex-end',
  },

  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 4,
    paddingRight: 30,
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