import React, { useState } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import ArrowUp from '@/assets/images/icons/ArrowUp';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const SUGGESTIONS = [
  'Wann beginnt das nächste Spiel?',
  'Wie ist der aktuelle Stand?',
  'Wie kann ich Tickets kaufen?',
  'Wer ist der Torschützenkönig?',
  'Zeig mir die Teamstatistiken'
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

  const onKeyPress = (e) => {
    if (Platform.OS === 'web' && suggestion) {
      const { key } = e.nativeEvent;
      if (key === 'Tab' || key === 'ArrowRight') {
        e.preventDefault();
        const completedText = text + suggestion;
        setText(completedText);
        setSuggestion('');
      }
    }
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
      setSuggestion('');
    }
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: 'transparent',
    padding: 16,
    width: '100%',
    marginBottom: 70,
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
    fontSize: 16,
    lineHeight: 48,
    color: 'rgba(255,255,255,0.3)',
    textAlignVertical: 'center',
  },
  inlineSuggestion: {
    color: 'rgba(255,255,255,0.3)',
  },
  divLeft: {
    flex: 0.65,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divRight: {
    flex: 0.35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 48,
    fontSize: 16,
    lineHeight: 48,
    paddingHorizontal: 16,
    zIndex: 1, // Ensures the TextInput renders above the overlay
    color: '#fff',
  },
  sendButton: {
    marginEnd: 20,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#D20515',
    width: 100,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});


export default ChatInput;
