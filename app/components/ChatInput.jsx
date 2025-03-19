import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import ArrowUp from '@/assets/images/icons/ArrowUp';

const SUGGESTIONS = [
  'Wer ist Torschützenkönig?',
  'Welches Stadion ist das Kleinste?',
  'Wo spielt Messi?',
];

const ChatInput = ({ onSend }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 🚀 Animation für das Ein- & Ausfahren
  const toggleSuggestions = (show) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: show ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: show ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleFocus = () => {
    setIsFocused(true);
    toggleSuggestions(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    toggleSuggestions(false);
  };

  const handleSuggestionPress = (suggestedText) => {
    setText(suggestedText);
    handleBlur(); // Animation zurückfahren
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
      handleBlur();
    }
  };

  return (
    <View style={styles.container}>
      {/* 💬 Animiertes Vorschlags-Karussell */}
      {isFocused && (
        <Animated.View
          style={[
            styles.suggestionBox,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0], // Von oben einfahren
                  }),
                },
              ],
              opacity: fadeAnim, // Für sanftes Ein-/Ausblenden
            },
          ]}
        >
          {SUGGESTIONS.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleSuggestionPress(item)} style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}

      {/* 📩 Eingabefeld & Senden-Button */}
      <View style={styles.inputRow}>
        <View style={styles.inputField}>
          <TextInput
            placeholder="Ask me anything"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={text}
            onChangeText={setText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.textInput}
            textColor="#FFFFFF"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.7}>
            <Text style={styles.sendText}>Send</Text>
            <ArrowUp color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
    marginBottom: 70,
  },
  // 🏆 Animiertes Suggestion-Karussell
  suggestionBox: {
    paddingHorizontal: 16,
    position: 'absolute',
    top: -120, // Startposition über dem Input
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 16,
    paddingVertical: 10,
    marginBottom: 0,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  suggestionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputField: {
    marginTop:20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    height: 50,
    width: '100%',
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#D20515',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#FFFFFF',
  },
  sendButton: {
    backgroundColor: '#D20515',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 5,
  },
});

export default ChatInput;