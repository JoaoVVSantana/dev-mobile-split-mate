import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import TitleComponent from '../components/components/TitleComponent'; 
import TextInputComponent from '../components/components/TextInputComponent';
import ParticipantsCheckboxes from '../components/components/ExpenseParticipantsCheckbox';
import CreateButton from '../components/components/CreateButton';
import { router } from 'expo-router';

export default function NewExpenseScreen() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [participants] = useState([
    "Ana Luíza",
    "Letícia Costa",
    "Murilo Silva",
    "Carlos Souza",
    "João Pereira",
    "Maria Oliveira",
    "Fernanda Lima",
    "Lucas Santos",
    "Juliana Almeida",
  ]);

  const handleValueChange = (text: string) => {
    setValue(text.replace(/[^0-9,]/g, '')); 
  };

  const handleParticipantSelection = (participant: string) => {
    setSelectedParticipants((prev: string[]) =>
      prev.includes(participant)
        ? prev.filter((item) => item !== participant)
        : [...prev, participant]
    );
  };

  const handleCreate = () => {
    if (!name || !value || selectedParticipants.length === 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    console.log("Despesa criada:", { name, value, selectedParticipants });
    Alert.alert('Sucesso', 'Despesa criada com sucesso!');
    router.push('/ScreenEvento');
  };

  return (
    <View style={styles.container}>
      <TitleComponent title="Nova Despesa" color="#38a37f" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <TextInputComponent
          label="Nome"
          value={name}
          onChangeText={setName}
          placeholder='Digite o nome da despesa'
        />

        <TextInputComponent
          label="Valor"
          value={value}
          onChangeText={handleValueChange}
          keyboardType="numeric"
          placeholder="R$ 0,00"
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
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
  },
  scrollContainer: {
    paddingBottom: 0, 
  },
  createButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    zIndex: 1, 
},
});