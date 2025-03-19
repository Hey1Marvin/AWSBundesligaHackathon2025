import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { TextInput } from 'react-native-paper';
import ArrowUp from '@/assets/images/icons/ArrowUp';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Erweitertes Dictionary mit Kategorien und Gewichtungen
const SMART_DICTIONARY = {
  sports: {
    words: [
      'Bundesliga', 'Bayern', 'Ball', 'Spiel', 'Mannschaft', 'Trainer', 'Tore', 'Statistik',
      'Spieler', 'Team', 'Sieg', 'Niederlage', 'Unentschieden', 'Meisterschaft', 'Pokal',
      'Anpfiff', 'Halbzeit', 'Abpfiff', 'Torwart', 'Verteidiger', 'Stürmer', 'Mittelfeld',
      'Flügelspieler', 'Auswechslung', 'Elfmeter', 'Foul', 'GelbeKarte', 'RoteKarte',
      'Trainerbank', 'Spielplan', 'Ligastart', 'Abstieg', 'Aufstieg', 'Saison', 'Vorrunde', 'Finale'
    ],
    weight: 1.0
  },
  common: {
    words: [
      'Hallo', 'Danke', 'Bitte', 'Heute', 'Morgen', 'Gestern', 'Jetzt', 'Später', 'Früher',
      'Wann', 'Wo', 'Warum', 'Wie', 'Was', 'Wer', 'Welche', 'Diese', 'Jene', 'Alle', 'Keine'
    ],
    weight: 0.8
  },
  technical: {
    words: [
      'Daten', 'Analyse', 'System', 'Programmierung', 'Software', 'Hardware', 'Netzwerk',
      'Technologie', 'Innovation', 'Entwicklung', 'Implementierung', 'Interface', 'Algorithmus',
      'Protokoll', 'Datenbank', 'Framework', 'Integration', 'Automatisierung'
    ],
    weight: 1.2
  }
};

// Flache Liste für einfache Suche
const FLAT_DICTIONARY = Object.values(SMART_DICTIONARY).reduce(
  (acc, category) => [...acc, ...category.words], []
);

const ChatInput = ({ onSend }) => {
  const colorScheme = useColorScheme();
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [recentSuggestions, setRecentSuggestions] = useState([]);
  const [userContext, setUserContext] = useState({ categories: {} });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);

  // Aktuelle Kategorie bestimmen basierend auf Kontext
  const getCurrentCategory = (inputText) => {
    const words = inputText.toLowerCase().split(/\s+/);
    const categoryScores = {};
    
    // Kategorien-Scores berechnen
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
      
      // Vorherige Interaktionen berücksichtigen
      if (userContext.categories[category]) {
        categoryScores[category] += userContext.categories[category] * 0.5;
      }
    });
    
    // Kategorie mit höchstem Score auswählen
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

  // Vorschläge basierend auf Kontext und aktueller Eingabe generieren
  const generateSuggestions = (inputText) => {
    const words = inputText.split(/\s+/);
    const lastWord = words[words.length - 1];
    
    if (lastWord.length < 2) return '';
    
    const currentCategory = getCurrentCategory(inputText);
    let matches = [];
    
    // Erste Priorität: Wörter aus der aktuellen Kategorie
    matches = SMART_DICTIONARY[currentCategory].words.filter(word => 
      word.toLowerCase().startsWith(lastWord.toLowerCase()) && 
      word.length > lastWord.length
    );
    
    // Zweite Priorität: Wörter aus anderen Kategorien
    if (matches.length === 0) {
      matches = FLAT_DICTIONARY.filter(word => 
        word.toLowerCase().startsWith(lastWord.toLowerCase()) && 
        word.length > lastWord.length
      );
    }
    
    // Dritte Priorität: Kürzlich verwendete Vorschläge priorisieren
    const recentMatches = recentSuggestions.filter(word => 
      word.toLowerCase().startsWith(lastWord.toLowerCase()) && 
      word.length > lastWord.length
    );
    
    if (recentMatches.length > 0) {
      matches = [...recentMatches, ...matches];
    }
    
    // Kürzeren Vorschlag bevorzugen, aber nicht zu kurz
    matches.sort((a, b) => {
      const aLen = a.length - lastWord.length;
      const bLen = b.length - lastWord.length;
      // Optimale Länge für Vorschläge ist 3-7 Zeichen
      const aOptimal = Math.abs(aLen - 5);
      const bOptimal = Math.abs(bLen - 5);
      return aOptimal - bOptimal;
    });
    
    return matches.length > 0 ? matches[0].slice(lastWord.length) : '';
  };

  // Bei Eingabeänderung
  const updateText = (inputText) => {
    setText(inputText);
    
    // Bei Zeilenumbruch Suggestion löschen
    if (inputText.includes('\n')) {
      setSuggestion('');
      return;
    }
    
    const newSuggestion = generateSuggestions(inputText);
    
    if (newSuggestion && newSuggestion !== suggestion) {
      setSuggestion(newSuggestion);
      // Animation für neue Vorschläge
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
  };

  // Vorschlag akzeptieren
  const acceptSuggestion = () => {
    if (suggestion) {
      const words = text.split(/\s+/);
      const lastWord = words[words.length - 1];
      const fullWord = lastWord + suggestion;
      
      // Zu kürzlich verwendeten Vorschlägen hinzufügen
      if (!recentSuggestions.includes(fullWord)) {
        setRecentSuggestions(prev => [fullWord, ...prev.slice(0, 9)]);
      }
      
      // Kontext aktualisieren
      const newContext = { ...userContext };
      Object.keys(SMART_DICTIONARY).forEach(category => {
        if (SMART_DICTIONARY[category].words.includes(fullWord)) {
          newContext.categories[category] = (newContext.categories[category] || 0) + 1;
        }
      });
      setUserContext(newContext);
      
      // Text aktualisieren
      words[words.length - 1] = fullWord;
      const completedText = words.join(' ');
      setText(completedText);
      setSuggestion('');
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

  // Nachricht senden
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
            {/* We're using a different approach here - a transparent input with an overlay */}
            <TextInput
  mode="flat"
  placeholder="Ask me anything..."
  placeholderTextColor={Colors[colorScheme ?? 'light'].tint }
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

             
              ref={inputRef}
              mode="flat"
              placeholder="Frag mich was..."
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={text}
              onChangeText={updateText}
              onKeyPress={onKeyPress}
              style={styles.textInput}
              textColor="#FFFFFF"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
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
            
            {suggestion && (
              <View style={styles.suggestionOverlay} pointerEvents="none">
                <View style={styles.invisibleText}>
                  <Text style={[styles.baseText, { opacity: 0 }]}>{text}</Text>
                </View>
                <Animated.Text style={[styles.suggestionText, { opacity: fadeAnim }]}>
                  {suggestion}
                </Animated.Text>
              </View>
            )}
          </View>
          <View style={styles.divRight}>
            {suggestion && (
              <TouchableOpacity style={styles.completeButton} onPress={acceptSuggestion} activeOpacity={0.7}>
                <Text style={{ color: '#FFFFFF', fontSize: 14 }}>Tab</Text>
              </TouchableOpacity>
            )}
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
  },
  divLeft: {
    flex: 0.65,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
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
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 1,
    color: '#FFFFFF',
  },
  suggestionOverlay: {
    position: 'absolute',
    flexDirection: 'row',
    left: 16, // Match textInput paddingHorizontal
    height: 48,
    alignItems: 'center',
    zIndex: 2,
    pointerEvents: 'none',
  },
  baseText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    fontWeight: '400',
  },
  invisibleText: {
    opacity: 0,
  },
  suggestionText: {
    fontSize: 16,
    color: 'rgba(200, 200, 200, 0.7)',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    fontWeight: '400',
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
    marginEnd: 20,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#D20515',
    width: 100,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
});

export default ChatInput;