import React from 'react';
import { View, ScrollView } from 'react-native';
import TitleComponent from '~/components/Title/TitleComponent';
import ParticipantsCheckboxes from '~/components/Checkbox/ParticipantsCheckbox';
import CreateButton from '~/components/Buttons/CreateButton';
import BackArrowButton from '~/components/Buttons/BackArrowButton';
import TextInputBase from '~/components/Text/TextInputBase';
import { useNewExpenseScreen } from '~/hooks/Screen/useNewExpenseScreen';

import {
  container,
  scrollContainer,
  createButtonContainer,
} from '~/styles/NewExpenseStyles';
import { EFormatTypes } from '~/types/EFormatTypes';

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
    <View style={container}>
      <BackArrowButton />
      <TitleComponent title="Nova Despesa" color="#38a37f" />

      <ScrollView contentContainerStyle={scrollContainer} showsVerticalScrollIndicator={false}>
        <TextInputBase
          label="Nome da despesa"
          value={name}
          onChangeText={setName}
          placeholder="Ex: Comida, Uber..."
          labelColor="#38a37f"
          placeholderTextColor="#ccc"
          backgroundColor="#5a139a"
        />

        <TextInputBase
          label="Valor"
          value={value}
          onChangeText={handleValueChange}
          keyboardType="numeric"
          placeholder="R$ 0,00"
          labelColor="#38a37f"
          placeholderTextColor="#ccc"
          backgroundColor="#5a139a"
          formatType = {EFormatTypes.Currency}
        />

        <ParticipantsCheckboxes
          participants={participants}
          selectedParticipants={selectedParticipants}
          onSelectParticipant={handleParticipantSelection}
        />
      </ScrollView>

      <View style={createButtonContainer}>
        <CreateButton onPress={handleCreate} />
      </View>
    </View>
  );
}
