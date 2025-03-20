import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import ArrowUp from '@/assets/images/icons/ArrowUp';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Extended dictionary with categories and weights
const SMART_DICTIONARY = {
  sports: {
    words: [
      'Bundesliga', 'Bayern', 'Ball', 'Spiel', 'Mannschaft', 'Trainer', 'Tore', 'Statistik',
      'Spieler', 'Team', 'Sieg', 'Niederlage', 'Unentschieden', 'Meisterschaft', 'Pokal',
      'Anpfiff', 'Halbzeit', 'Abpfiff', 'Torwart', 'Verteidiger', 'Stürmer', 'Mittelfeld',
      'Flügelspieler', 'Auswechslung', 'Elfmeter', 'Foul', 'GelbeKarte', 'RoteKarte',
      'Trainerbank', 'Spielplan', 'Ligastart', 'Abstieg', 'Aufstieg', 'Saison', 'Vorrunde', 'Finale'
    ],
    weight: 1.0,
  },
  common: {
    words: [
      'Hallo', 'Danke', 'Bitte', 'Heute', 'Morgen', 'Gestern', 'Jetzt', 'Später', 'Früher',
      'Wann', 'Wo', 'Warum', 'Wie', 'Was', 'Wer', 'Welche', 'Diese', 'Jene', 'Alle', 'Keine'
    ],
    weight: 0.8,
  },
  technical: {
    words: [
      'Daten', 'Analyse', 'System', 'Programmierung', 'Software', 'Hardware', 'Netzwerk',
      'Technologie', 'Innovation', 'Entwicklung', 'Implementierung', 'Interface', 'Algorithmus',
      'Protokoll', 'Datenbank', 'Framework', 'Integration', 'Automatisierung'
    ],
    weight: 1.2,
  }
};

// Flattened list for simple search
const FLAT_DICTIONARY = Object.values(SMART_DICTIONARY).reduce(
  (acc, category) => [...acc, ...category.words], []
);

const ChatInput = ({ onSend, onQuizStart }) => {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [recentSuggestions, setRecentSuggestions] = useState([]);
  const [userContext, setUserContext] = useState({ categories: {} });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  // Determine the current category based on context
  const getCurrentCategory = (inputText) => {
    const words = inputText.toLowerCase().split(/\s+/);
    const categoryScores = {};
    
    Object.keys(SMART_DICTIONARY).forEach(category => {
      categoryScores[category] = 0;
      
      words.forEach(word => {
        if (word.length > 2) {
          SMART_DICTIONARY[category].words.forEach(dictWord => {
            if (dictWord.toLowerCase().includes(word)) {
              categoryScores[category] += SMART_DICTIONARY[category].weight;
            }
          });
        }
      });
      
      // Consider previous interactions
      if (userContext.categories[category]) {
        categoryScores[category] += userContext.categories[category] * 0.5;
      }
    });
    
    // Select the category with the highest score
    let topCategory = 'sports'; // Default
    let maxScore = 0;
    Object.keys(categoryScores).forEach(category => {
      if (categoryScores[category] > maxScore) {
        maxScore = categoryScores[category];
        topCategory = category;
      }
    });
    
    return topCategory;
  };

  // Generate suggestions based on context and current input
  const generateSuggestions = (inputText) => {
    const words = inputText.split(/\s+/);
    const lastWord = words[words.length - 1];
    
    if (lastWord.length < 2) return '';
    
    const currentCategory = getCurrentCategory(inputText);
    let matches = SMART_DICTIONARY[currentCategory].words.filter(word => 
      word.toLowerCase().startsWith(lastWord.toLowerCase()) && 
      word.length > lastWord.length
    );
    
    // Try other categories if none are found
    if (matches.length === 0) {
      matches = FLAT_DICTIONARY.filter(word => 
        word.toLowerCase().startsWith(lastWord.toLowerCase()) && 
        word.length > lastWord.length
      );
    }
    
    // Prioritize recently used suggestions
    const recentMatches = recentSuggestions.filter(word => 
      word.toLowerCase().startsWith(lastWord.toLowerCase()) && 
      word.length > lastWord.length
    );
    
    if (recentMatches.length > 0) {
      matches = [...recentMatches, ...matches];
    }
    
    // Prefer suggestions with optimal length (3-7 extra characters)
    matches.sort((a, b) => {
      const aLen = a.length - lastWord.length;
      const bLen = b.length - lastWord.length;
      const aOptimal = Math.abs(aLen - 5);
      const bOptimal = Math.abs(bLen - 5);
      return aOptimal - bOptimal;
    });
    
    return matches.length > 0 ? matches[0].slice(lastWord.length) : '';
  };

  // Update text and generate ghost text suggestion
  const updateText = (inputText) => {
    setText(inputText);
    
    // Remove suggestion if multiline
    if (inputText.includes('\n')) {
      setSuggestion('');
      return;
    }
    
    const newSuggestion = generateSuggestions(inputText);
    
    if (newSuggestion && newSuggestion !== suggestion) {
      setSuggestion(newSuggestion);
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else if (!newSuggestion) {
      setSuggestion('');
    }
    
    // Scroll to the end when typing
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 50);
    }
  };

  // Accept the ghost suggestion
  const acceptSuggestion = () => {
    if (suggestion) {
      const words = text.split(/\s+/);
      const lastWord = words[words.length - 1];
      const fullWord = lastWord + suggestion;
      
      // Add to recent suggestions if not already present
      if (!recentSuggestions.includes(fullWord)) {
        setRecentSuggestions(prev => [fullWord, ...prev.slice(0, 9)]);
      }
      
      // Update context based on accepted suggestion
      const newContext = { ...userContext };
      Object.keys(SMART_DICTIONARY).forEach(category => {
        if (SMART_DICTIONARY[category].words.includes(fullWord)) {
          newContext.categories[category] = (newContext.categories[category] || 0) + 1;
        }
      });
      setUserContext(newContext);
      
      // Replace the last word with the completed word
      words[words.length - 1] = fullWord;
      const completedText = words.join(' ');
      setText(completedText);
      setSuggestion('');
      
      if (scrollViewRef.current) {
        setTimeout(() => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }, 50);
      }
    }
  };

  const onKeyPress = (e) => {
    if (Platform.OS === 'web' && suggestion) {
      const { key } = e.nativeEvent;
      if (key === 'Tab' || key === 'ArrowRight') {
        e.preventDefault();
        acceptSuggestion();
      }
    }
  };

  // Send the message
  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
      setSuggestion('');
    }
  };

  // Start the quiz
  const handleQuizStart = () => {
    if (onQuizStart && typeof onQuizStart === 'function') {
      onQuizStart();
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(16, insets.bottom) }]}>
      <View style={styles.inputRow}>
        <View style={[styles.inputField, { backgroundColor: Colors[colorScheme ?? 'light'].eleColor }]}>
          <View style={styles.divLeft}>
            <ScrollView 
              ref={scrollViewRef}
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContentContainer}
            >
              <View style={styles.inputContainer}>
                <TextInput
                  ref={inputRef}
                  mode="flat"
                  placeholder="Ask me anything..."
                  placeholderTextColor={Colors[colorScheme ?? 'light'].tint}
                  value={text}
                  onChangeText={updateText}
                  onKeyPress={onKeyPress}
                  style={[styles.textInput, {color:Colors[colorScheme ?? 'light'].tint}]}
                  textColor={Colors[colorScheme ?? 'light'].tint}
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  selectionColor={Colors[colorScheme ?? 'light'].mainRed}
                  multiline={false}
                  theme={{
                    colors: {
                      text: '#FFFFFF',
                      placeholder: 'rgba(255,255,255,0.6)',
                      primary: '#e10600',
                      background: 'transparent'
                    }
                  }}
                />
                {/* Ghost text suggestion overlay */}
                {suggestion && (
                  <View style={styles.suggestionWrapper}>
                    <Text style={styles.hiddenText}>{text}</Text>
                    <Animated.Text style={[styles.suggestionText, { opacity: fadeAnim }]}>
                      {suggestion}
                    </Animated.Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
          <View style={styles.divRight}>
            {suggestion && (
              <TouchableOpacity style={styles.completeButton} onPress={acceptSuggestion} activeOpacity={0.7}>
                <Text style={[{ fontSize: 14 }, { color: Colors[colorScheme ?? 'light'].tint }]}>Tab</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.7}>
              <Text style={[{ fontSize: 16 }, { marginRight: 4 }, { color: '#fff' }]}>Send</Text>
              <ArrowUp color="#FFFFFF" size={18} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.quizButton, {backgroundColor: Colors[colorScheme ?? 'light'].eleColor}] } 
              onPress={handleQuizStart} 
              activeOpacity={0.7}
            >
              <Text style={[styles.quizButtonText, {color: Colors[colorScheme ?? 'light'].tint}] } >Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    padding: 16,
    width: '100%',
    zIndex: 100,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputField: {
    flex: 2,
    flexDirection: 'row',
    position: 'relative',
    borderRadius: 24,
    height: 70,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  divLeft: {
    flex: Platform.OS === 'web' ? 0.9 : 0.65,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  divRight: {
    flex: Platform.OS === 'web' ? 0.1 : 0.35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 12,
    minWidth: Platform.OS === 'web' ? 170 : 210,
  },
  scrollContainer: {
    flex: 1,
    flexGrow: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
    minWidth: '100%',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 48,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  suggestionWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    pointerEvents: 'none',
  },
  hiddenText: {
    color: 'transparent',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  suggestionText: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  completeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 40,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  sendButton: {
    marginEnd: 8,
    flexDirection: 'row',
    backgroundColor: '#D20515',
    width: 100,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizButton: {
    borderColor: '#D20515',
    borderWidth: 1.5,
    width: 64,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizButtonText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default ChatInput;
