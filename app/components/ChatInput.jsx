import React, { useState } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SUGGESTIONS = [
  'Wann beginnt das nächste Spiel?',
  'Wie ist der aktuelle Stand?',
  'Wie kann ich Tickets kaufen?',
  'Wer ist der Torschützenkönig?',
  'Zeig mir die Teamstatistiken'
];

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const updateText = (inputText) => {
    setText(inputText);

    // Clear suggestion on newline
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
        <View style={styles.inputWrapper}>
          <View style={styles.inputField}>
            {/* Ghost suggestion overlay */}
            {(text || suggestion) && (
              <Text style={styles.suggestionOverlay} pointerEvents="none">
                {text}
                <Text style={styles.inlineSuggestion}>{suggestion}</Text>
              </Text>
            )}
            <TextInput
              mode="flat"
              placeholder="Nachricht senden..."
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={text}
              onChangeText={updateText}
              onKeyPress={onKeyPress}
              style={styles.textInput}
              textColor="#FFFFFF"
              underlineColor="transparent"
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
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.7}>
          <Icon name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
  },
  inputField: {
    position: 'relative',
    backgroundColor: '#121212',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    // We remove extra horizontal padding here to let both layers use their own padding
    paddingHorizontal: 0,
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
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 48,
    fontSize: 16,
    lineHeight: 48,
    paddingHorizontal: 16,
    zIndex: 1, // Ensures the TextInput renders above the overlay
  },
  sendButton: {
    backgroundColor: '#e10600',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});

export default ChatInput;
