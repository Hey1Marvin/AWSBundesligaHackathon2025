import React, { useState } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import ArrowUp from '@/assets/images/icons/ArrowUp';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const SUGGESTIONS = [
  'Wer ist Torschützenkönig?',
  'Welches Stadion ist das Kleinste?',
  'Wo spielt Messi?',
];

const ChatInput = ({ onSend }) => {
  const colorScheme = useColorScheme();
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const updateText = (inputText) => {
    setText(inputText);
    if (inputText.includes('\n')) {
      setSuggestion('');
      return;
    }
    if (inputText.length > 0) {
      const match = SUGGESTIONS.find(item =>
        item.toLowerCase().startsWith(inputText.toLowerCase())
      );
      setSuggestion(match && match.length > inputText.length ? match.slice(inputText.length) : '');
    } else {
      setSuggestion('');
    }
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
        <View style={[styles.inputField, { backgroundColor: Colors[colorScheme ?? 'light'].eleColor }]}>
          <View style={styles.divLeft}>
            {(text || suggestion) && (
              <Text style={styles.suggestionOverlay} pointerEvents="none">
                {text}
                <Text style={styles.inlineSuggestion}>{suggestion}</Text>
              </Text>
            )}
            <TextInput
  mode="flat"
  placeholder="Ask me anything..."
  placeholderTextColor="rgba(255,255,255,0.6)"
  value={text}
  onChangeText={updateText}
  onKeyPress={onKeyPress}
  style={styles.textInput}
  textColor="#FFFFFF"
  underlineColor="transparent"
  activeUnderlineColor="transparent"  // <-- Add this line
  selectionColor="#e10600"
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

             
          </View>
          <View style={styles.divRight}>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.7}>
              <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Send</Text>
              <ArrowUp color="#FFFFFF" />
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
    paddingHorizontal: 0,
    // Remove the red border by commenting out or deleting these lines:
    // borderWidth: 1.5,
    // borderColor: '#D20515',
  },
  suggestionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#D20515',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 16,
    lineHeight: 48,
    paddingHorizontal: 16,
    zIndex: 1, // Ensures the TextInput renders above the overlay
    color: '#fff',
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