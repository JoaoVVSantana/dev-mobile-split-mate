import React from "react";
import { View, ScrollView } from "react-native";
import TitleComponent from "~/components/Title/TitleComponent";
import ParticipantsCheckboxes from "~/components/Checkbox/ParticipantsCheckbox";
import CreateButton from "~/components/Buttons/CreateButton";
import BackArrowButton from "~/components/Buttons/BackArrowButton";
import TextInputBase from "~/components/Text/TextInputBase";
import { useNewExpenseScreen } from "~/hooks/Screen/useNewExpenseScreen";

import {
  container,
  scrollContainer,
  createButtonContainer,
} from "~/styles/NewExpenseStyles";
import { EFormatTypes } from "~/types/EFormatTypes";
import NewEventForm from "~/components/Form/NewEventForm";
import { ToastProvider } from "~/components/Toast/ToastFeedback";

export default function NewExpenseScreen() {
  const {
    name,
    value,
    participants,
    selectedParticipants,
    setName,
    handleValueChange,
    handleParticipantSelection,
    handleCreate,
  } = useNewExpenseScreen();

  return (
    <ToastProvider>
    <View style={container}>
      <BackArrowButton />
      <TitleComponent title="Nova Despesa" color="#fff" />

      <ScrollView
        contentContainerStyle={scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <NewEventForm>
          <TextInputBase
            label="Nome da despesa"
            value={name}
            onChangeText={setName}
            placeholder="Ex: Comida, Uber..."
            labelColor="#fff"
            placeholderTextColor="#a3a3a3"
            backgroundColor="#fff"
          />

          <TextInputBase
            label="Valor"
            value={value}
            onChangeText={handleValueChange}
            keyboardType="numeric"
            placeholder="R$ 0,00"
            labelColor="#fff"
            placeholderTextColor="#a3a3a3"
            backgroundColor="#fff"
            formatType={EFormatTypes.Currency}
          />

          <ParticipantsCheckboxes
            participants={participants}
            selectedParticipants={selectedParticipants}
            onSelectParticipant={handleParticipantSelection}
            label="Quem fez parte da despesa?"
            labelColor="#fff"
            containerStyle={{ width: 300 }}
          />
        </NewEventForm>
      </ScrollView>
      <View style={createButtonContainer}>
          <CreateButton
            onPress={handleCreate}
          />
        </View>
    </View>
    </ToastProvider>
  );
}
