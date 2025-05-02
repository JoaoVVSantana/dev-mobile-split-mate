import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  container,
  eventsContainer,
  horizontal,
  grid,
  eventButtonContainer,
  horizontalEvent,
  overlay,
  optionsContainer,
  optionButton,
  optionText,
} from '~/styles/HomeStyles';

import EventCard from '../components/Card/EventCard';
import TitleComponent from '../components/Title/TitleComponent';
import SearchBar from '../components/Search/SearchBar';
import FloatingButton from '../components/Buttons/FloatingButton';
import { useHomeScreen } from '../hooks/Screen/useHomeScreen';

export default function HomeScreen() {
  const {
    searchQuery,
    setSearchQuery,
    showOptions,
    isOverlayActive,
    toggleOptions,
    closeOptions,
    filteredEvents,
    navigateToEvent,
    navigateToNewEvent,
  } = useHomeScreen();

  const isHorizontal = filteredEvents.length <= 5;
  const layoutStyle = isHorizontal ? horizontal : grid;

  return (
    <View style={container}>
      <TitleComponent title="Meus eventos" />

      <SearchBar
        placeholder="Procurar eventos"
        onChangeText={setSearchQuery}
      />

      <ScrollView>
        <View style={[eventsContainer, layoutStyle]}>
          {filteredEvents.map((event, index) => (
            <View
              key={index}
              style={[eventButtonContainer, isHorizontal && horizontalEvent]}
            >
              <EventCard
                eventName={event.title}
                color="#5a139a"
                onPress={() => navigateToEvent(event)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {isOverlayActive && (
        <TouchableWithoutFeedback onPress={closeOptions}>
          <View style={overlay} />
        </TouchableWithoutFeedback>
      )}

      <FloatingButton color="#38a37f" onPress={toggleOptions} />

      {showOptions && (
        <View style={optionsContainer}>
          <OptionButton label="Novo evento" onPress={navigateToNewEvent} />
          <OptionButton label="Editar eventos" onPress={() => console.log('Editar eventos')} />
        </View>
      )}
    </View>
  );
}

function OptionButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={optionButton} onPress={onPress}>
      <Text style={optionText}>{label}</Text>
    </TouchableOpacity>
  );
}
