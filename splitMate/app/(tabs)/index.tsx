import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import TitleComponent from '../../components/components/TitleComponent';
import EventCard from '../../components/components/EventCard';
import SearchBar from '../../components/components/SearchBar'; 
import FloatingButton from '../../components/components/FloatingButton'; 

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false); 
  const [isOverlayActive, setIsOverlayActive] = useState(false); 
  
  const events = [
    "Casa da Letícia",
    "Churras do João",
    "Festa de Aniversário",
    "Reunião de Trabalho",
    "Festa de Aniversário",
    "Reunião de Trabalho",
    "Festa de Aniversário",
    "Reunião de Trabalho",
    "Casa da Letícia",
    "Churras do João",
    "Festa de Aniversário",
    "Reunião de Trabalho",
    "Festa de Aniversário",
    "Reunião de Trabalho",
    "Festa de Aniversário",
    "Reunião de Trabalho"
  ];

  const filteredEvents = events.filter(event =>
    event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setIsOverlayActive(!isOverlayActive); 
  };

  const closeOptions = () => {
    setShowOptions(false);
    setIsOverlayActive(false);
  };

  const renderEvents = () => {
    const isHorizontal = filteredEvents.length <= 5;

    return (
      <View style={[styles.eventsContainer, isHorizontal ? styles.horizontal : styles.grid]}>
        {filteredEvents.map((event, index) => (
          <View key={index} style={[styles.eventButtonContainer, isHorizontal && styles.horizontalEvent]}>
            <EventCard eventName={event} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TitleComponent title="Meus eventos" />

      <SearchBar 
        placeholder="Procurar eventos"
        onChangeText={setSearchQuery}
      />
      
      <ScrollView>
        {renderEvents()}
      </ScrollView>

      {isOverlayActive && (
        <TouchableWithoutFeedback onPress={closeOptions}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <FloatingButton onPress={toggleOptions} />

      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={() => console.log("Novo evento")}>
            <Text style={styles.optionText}>Novo evento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => console.log("Editar eventos")}>
            <Text style={styles.optionText}>Editar eventos</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
  },

  eventsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  eventButtonContainer: {
    width: '48%',
    marginBottom: 10,
  },

  horizontalEvent: {
    width: '100%', 
    marginBottom: 10,
  },
  secondEvent: {
    marginLeft: '4%',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    zIndex: 0, 
  },
  optionsContainer: {
    position: 'absolute',
    right: 20,
    bottom: 90, 

    elevation: 5, 
    padding: 10,
    width: 160, 
    zIndex: 2, 
  },
  optionButton: {
    backgroundColor: '#5a139a', 
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});