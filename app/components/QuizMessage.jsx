import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, TouchableOpacity, Platform } from 'react-native';
import ChattingIconBundesliga from '@/assets/images/icons/ChattingIconBundesliga';
import ThumbsUp from '@/assets/images/icons/Toor';
import ThumbsDown from '@/assets/images/icons/RoteKarte';
import VolumeUp from '@/assets/images/icons/speaker';
import CopyIcon from '@/assets/images/icons/Copy';
import * as Speech from 'expo-speech';
import * as Clipboard from 'expo-clipboard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const QuizMessage = ({ 
  question, 
  options, 
  correctAnswer, 
  onAnswerSelected, 
  timestamp = new Date() 
}) => {
  const colorScheme = useColorScheme();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const iconScale = useRef(new Animated.Value(0.8)).current;

  // Format time
  const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Theme colors
  const activeColor = '#e10600'; // Red
  const inactiveColor = Colors[colorScheme ?? 'light'].icon; // Gray from theme

  // Animations
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

    // Animation of Bot Message option
    Animated.spring(iconScale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    return () => Speech.stop();
  }, [fadeAnim, scaleAnim, pulseAnim, isSpeaking]);

  // Handle option selection
  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setShowFeedback(true);
    
    // Callback for parent component
    onAnswerSelected(index, index === correctAnswer);
  };

  // Handle action buttons
  const handleThumbs = (type) => {
    setRating(current => current === type ? null : type);
  };

  const handleCopy = () => {
    Clipboard.setString(question + "\n\n" + options.map((opt, i) => 
      `${String.fromCharCode(65 + i)}. ${opt}`).join("\n"));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReadAloud = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      const textToRead = `${question} ${options.map((opt, i) => 
        `Option ${String.fromCharCode(65 + i)}: ${opt}`).join(". ")}`;
      Speech.speak(textToRead, {
        language: 'de-DE',
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

  // Option styling based on state
  const getOptionStyle = (index) => {
    if (!showFeedback) {
      return selectedOption === index ? styles.selectedOption : styles.option;
    }
    
    if (index === correctAnswer) {
      return styles.correctOption;
    }
    
    return selectedOption === index && selectedOption !== correctAnswer ? styles.wrongOption : styles.option;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.messageWrapper,
          styles.systemMessageWrapper,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <ChattingIconBundesliga />

        <View style={[
          styles.bubble, 
          styles.systemBubble, 
          { backgroundColor: Colors[colorScheme ?? 'light'].answerBack }
        ]}>
          {/* Question */}
          <Text style={[
            styles.questionText, 
            { color: Colors[colorScheme ?? 'light'].answerTint }
          ]}>
            {question}
          </Text>
          
          {/* Answer options */}
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  getOptionStyle(index),
                  { backgroundColor: Colors[colorScheme ?? 'light'].navbar}
                ]}
                onPress={() => !showFeedback && handleOptionSelect(index)}
                disabled={showFeedback}
              >
                <Text 
                  style={[
                    styles.optionText,
                    {
                      color: showFeedback && index === correctAnswer 
                        ? Colors[colorScheme ?? 'light'].tint
                        : showFeedback && index === selectedOption && selectedOption !== correctAnswer
                          ? Colors[colorScheme ?? 'light'].tint
                          : Colors[colorScheme ?? 'light'].tint
                    }
                  ]}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Feedback when needed */}
          {showFeedback && (
            <View 
              style={[
                styles.feedbackContainer,
                { 
                  backgroundColor: selectedOption === correctAnswer 
                    ? 'rgba(39, 174, 96, 0.1)' 
                    : 'rgba(231, 76, 60, 0.1)'
                }
              ]}
            >
              <Text style={[
                styles.feedbackText,
                { 
                  color: selectedOption === correctAnswer 
                    ? '#27AE60' 
                    : '#E74C3C'
                }
              ]}>
                {selectedOption === correctAnswer 
                  ? 'Richtig! 👏' 
                  : `Falsch! Die richtige Antwort ist ${String.fromCharCode(65 + correctAnswer)}.`}
              </Text>
            </View>
          )}
          
          <Animated.Text style={[
            styles.timestamp, 
            { color: Colors[colorScheme ?? 'light'].tint }
          ]}>
            {formattedTime}
          </Animated.Text>
        </View>

        {/* Action icons below bubble */}
        <View style={styles.actionsContainer}>

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
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Container
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 12,
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
  systemBubble: {
    borderTopLeftRadius: 4,
    marginLeft: 20, // Space for Bundesliga icon
  },

  // Question
  questionText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
    fontWeight: '500',
  },

  // Options
  optionsContainer: {
    marginBottom: 8,
  },
  optionButton: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  selectedOption: {
    backgroundColor: 'rgba(225, 6, 0, 0.1)',
    borderColor: '#e10600',
  },
  correctOption: {
    backgroundColor: '#27AE60',
    borderColor: '#27AE60',
  },
  wrongOption: {
    backgroundColor: '#E74C3C',
    borderColor: '#E74C3C',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },

  // Feedback
  feedbackContainer: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Timestamp
  timestamp: {
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
    paddingRight: 40,
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
});

export default QuizMessage;