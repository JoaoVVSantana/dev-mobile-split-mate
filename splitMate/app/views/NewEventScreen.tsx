import React from "react";
import { View, ScrollView } from "react-native";
import BackArrowButton from "~/components/Buttons/BackArrowButton";
import TitleComponent from "~/components/Title/TitleComponent";
import CreateButton from "~/components/Buttons/CreateButton";
import TextInputBase from "~/components/Text/TextInputBase";
import { useNewEventScreen } from "~/hooks/Screen/useNewEventScreen";
import { EFormatTypes } from "~/types/EFormatTypes";
import NewEventForm from "~/components/Form/NewEventForm";
import ParticipantsCheckboxes from "~/components/Checkbox/ParticipantsCheckbox";

import {
  container,
  scrollContainer,
  buttonContainer,
} from "~/styles/NewEventStyles";

export default function NewEventScreen() {
  const {
    eventName,
    eventDate,
    participants,
    setEventName,
    setEventDate,
    availableParticipants,
    handleToggle,
    handleCreateEvent,
  } = useNewEventScreen();

  return (
    <View style={container}>
      <BackArrowButton />
      <TitleComponent title="Novo evento" color="#ffffff" />

      <NewEventForm>
        <TextInputBase
          label="Qual o nome do evento?"
          value={eventName}
          onChangeText={setEventName}
          placeholder="Nome do evento"
          labelColor="#ffffff"
          placeholderTextColor="#5a139a"
          backgroundColor="#ffffff"
        />

        <TextInputBase
          label="Digite a data do evento"
          value={eventDate}
          onChangeText={setEventDate}
          placeholder="DD/MM/AAAA"
          labelColor="#ffffff"
          placeholderTextColor="#5a139a"
          backgroundColor="#ffffff"
          keyboardType="numeric"
          formatType={EFormatTypes.Date}
        />

        <ParticipantsCheckboxes
          participants={availableParticipants}
          selectedParticipants={participants}
          onSelectParticipant={handleToggle}
          label="Quem vai participar?"
          labelColor="#fff"
          containerStyle={{ width: 300 }}
        />
      </NewEventForm>

      <View style={buttonContainer}>
        <CreateButton
          onPress={handleCreateEvent}
          backgroundColor="#38a37f"
          textColor="#ffffff"
        />
      </View>
    </View>
  );
}
