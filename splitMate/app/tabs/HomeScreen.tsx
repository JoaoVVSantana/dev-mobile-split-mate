import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useToastFeedback, EToastVariants } from '~/components/Toast/ToastFeedback';

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
} from "~/styles/HomeStyles";

import EventCard from "../components/Card/EventCard";
import SearchBar from "../components/Search/SearchBar";
import { useHomeScreen } from "../hooks/Screen/useHomeScreen";
import { TEvent } from "~/types/TEvent";
import TitleWithActionButton from "~/components/Title/TitleWithAction";

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
    deleteEvent,
  } = useHomeScreen();

  const [isEditing, setIsEditing] = useState(false);
  const isHorizontal = filteredEvents.length <= 5;
  const layoutStyle = isHorizontal ? horizontal : grid;

  const toast = useToastFeedback();

  const handleDelete = (event: TEvent) => {
    deleteEvent(event);
  
    toast.showToast({
      message: `Evento "${event.title}" removido com sucesso!`,
      variant: EToastVariants.SUCCESS,
    });
  };
  

  return (
    <View style={container}>
        <TitleWithActionButton title="Meus eventos" onPress={toggleOptions} color="#38a37f" />
      {showOptions && (
        <View style={optionsContainer}>
          <OptionButton label="Novo evento" onPress={navigateToNewEvent} />
          <OptionButton
            label={isEditing ? "Finalizar edição" : "Editar eventos"}
            onPress={() => {
              setIsEditing((prev) => !prev);
              closeOptions();
            }}
          />
        </View>
      )}

      <SearchBar placeholder="Procurar eventos" onChangeText={setSearchQuery} />

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
                isEditing={isEditing}
                onDelete={() => handleDelete(event)}
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
