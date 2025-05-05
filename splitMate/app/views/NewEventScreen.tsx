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

import { container, scrollContainer } from "~/styles/NewEventStyles";

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
  console.log(participants);
  return (
    <View style={container}>
      <BackArrowButton />
      <TitleComponent title="Novo evento" color="#ffffff" />

      <ScrollView
        contentContainerStyle={scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <NewEventForm>
          <TextInputBase
            label="Qual o nome do evento?"
            value={eventName}
            onChangeText={setEventName}
            placeholder="Nome do evento"
            labelColor="#ffffff"
            placeholderTextColor="#cccccc"
            backgroundColor="#ffffff10"
          />

          <TextInputBase
            label="Digite a data do evento"
            value={eventDate}
            onChangeText={setEventDate}
            placeholder="DD/MM/AAAA"
            labelColor="#ffffff"
            placeholderTextColor="#cccccc"
            backgroundColor="#ffffff10"
            formatType={EFormatTypes.Date}
          />

          <ParticipantsCheckboxes
            participants={availableParticipants}
            selectedParticipants={participants}
            onSelectParticipant={handleToggle}
            label="Quem vai participar?"
            labelColor="#fff"
            containerStyle={{ marginTop: 30 }}
            checkboxStyle={{ borderColor: "white" }}
          />

          <CreateButton
            onPress={handleCreateEvent}
            backgroundColor="#38a37f"
            textColor="#ffffff"
          />
        </NewEventForm>
      </ScrollView>

     
    </View>
  );
}
