import React, { useState } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const suggestionsList = [
  'Wann beginnt das nächste Spiel?',
  'Wie ist der aktuelle Stand?',
  'Wie kann ich Tickets kaufen?',
  'Wer ist der Torschützenkönig?',
  'Zeig mir die Teamstatistiken'
];

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [inlineSuggestion, setInlineSuggestion] = useState('');

  const handleChange = (text) => {
    setInput(text);
    
    // Clear suggestion if text contains newline
    if (text.includes('\n')) {
      setInlineSuggestion('');
      return;
    }
    
    // Find matching suggestion
    if (text.length > 0) {
      const match = suggestionsList.find(suggestion =>
        suggestion.toLowerCase().startsWith(text.toLowerCase())
      );
      
      if (match && match.length > text.length) {
        setInlineSuggestion(match.slice(text.length));
      } else {
        setInlineSuggestion('');
      }
    } else {
      setInlineSuggestion('');
    }
  };

  // Web-only: Accept inline suggestion via Tab or ArrowRight key
  const handleKeyPress = (e) => {
    if (Platform.OS === 'web' && inlineSuggestion) {
      const { key } = e.nativeEvent;
      if (key === 'Tab' || key === 'ArrowRight') {
        e.preventDefault(); // Prevent default tab behavior
        const completedText = input + inlineSuggestion;
        setInput(completedText);
        setInlineSuggestion('');
      }
    }
  };

  const handleSubmit = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
      setInlineSuggestion('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          mode="flat"
          placeholder="Nachricht senden..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={input}
          onChangeText={handleChange}
          onKeyPress={handleKeyPress}
          style={styles.inputField}
          underlineColor="transparent"
          selectionColor="#e10600"
          multiline={false}
          theme={{
            colors: {
              text: '#ffffff',
              placeholder: 'rgba(255, 255, 255, 0.5)',
              primary: '#e10600',
              background: '#1f1f1f'
            }
          }}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Icon name="send" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      
      {inlineSuggestion ? (
        <View style={styles.suggestionContainer}>
          <Text style={styles.ghostText}>{input}</Text>
          <Text style={styles.suggestionText}>{inlineSuggestion}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    padding: 12,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    borderRadius: 24,
    color: '#ffffff',
    paddingHorizontal: 16,
    marginRight: 8,
    height: 48,
  },
  sendButton: {
    backgroundColor: '#e10600',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  ghostText: {
    color: 'transparent',
  },
  suggestionText: {
    color: 'rgba(255, 255, 255, 0.5)',
  }
});

export default ChatInput;