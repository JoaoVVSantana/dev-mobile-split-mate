import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TitleComponent from '../components/Title/TitleComponent';
import ParticipantsCheckboxes from '../components/Checkbox/ParticipantsCheckbox';
import CreateButton from '../components/Buttons/CreateButton';
import { useNewExpenseScreen } from '../hooks/Screen/useNewExpenseScreen';
import BackArrowButton from '../components/Buttons/BackArrowButton';
import TextInputBase from '../components/Text/TextInputBase';


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
    <View style={styles.container}>
      <BackArrowButton />
      <TitleComponent title="Nova Despesa" color="#38a37f" />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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
          formatType="currency"
        />

        <ParticipantsCheckboxes
          participants={participants}
          selectedParticipants={selectedParticipants}
          onSelectParticipant={handleParticipantSelection}
        />
      </ScrollView>

      <View style={styles.createButtonContainer}>
        <CreateButton onPress={handleCreate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  createButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    zIndex: 1,
  },
});