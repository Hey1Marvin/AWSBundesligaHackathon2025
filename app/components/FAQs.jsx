import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FAQs = ({ onSelect }) => {
  const questions = [
    'Wann beginnt das nächste Spiel?',
    'Wie ist der aktuelle Stand?',
    'Wie kann ich Tickets kaufen?',
    'Wer ist der Torschützenkönig?',
    'Zeig mir die Teamstatistiken',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Häufig gestellte Fragen</Text>
      {questions.map((question, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => onSelect(question)} 
          activeOpacity={0.8}
          style={styles.faqButton}
        >
          <Text style={styles.faqText}>{question}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  faqButton: {
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 12,
    width: '80%',
  },
  faqText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default FAQs;
