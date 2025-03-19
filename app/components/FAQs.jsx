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
      <Text style={styles.title}>FAQs</Text>
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
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f0f0f0',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  faqButton: {
    backgroundColor: '#2a2a2a',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
    width: '70%',
    borderWidth: 1,
    borderColor: '#555',
    // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  faqText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default FAQs;
