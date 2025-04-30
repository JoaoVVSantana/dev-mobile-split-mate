import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import TitleComponent from '../components/components/TitleComponent';
import TextInputEventoComponent from '../components/components/TextInputEventoComponent';
import NavigationButton from '../components/components/NavigationButton';
import Toast from 'react-native-toast-message';

export default function NewEventScreen() {
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState('');
  const router = useRouter();

  const handleAddParticipant = () => {
    if (newParticipant) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');

      Toast.show({
        type: 'success',
        text1: `Participante ${newParticipant} adicionado!`,
        position: 'top',
        visibilityTime: 1500,
      });
    }
  };

  const handleCreateEvent = () => {
    console.log({ eventName, eventDate, participants });
    Alert.alert('Sucesso', 'Evento criado com sucesso!', [
      {
        text: 'OK',
        onPress: () => router.push('/ScreenMeusEventos'),
      },
    ]);
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      <TitleComponent title="Novo evento" color="#ffffff" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {step === 1 && (
          <View style={styles.formStep}>
            <Text style={styles.label}>Qual o nome do evento?</Text>
            <TextInputEventoComponent
              value={eventName}
              onChangeText={setEventName}
              placeholder="Nome do evento"
            />
          </View>
        )}
        {step === 2 && (
          <View style={styles.formStep}>
            <Text style={styles.label}>Digite a data do evento</Text>
            <TextInputEventoComponent
              value={eventDate}
              onChangeText={setEventDate}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
            />
          </View>
        )}
        {step === 3 && (
          <View style={styles.formStep}>
            <Text style={styles.label}>Insira os participantes do evento</Text>
            <TextInputEventoComponent
              value={newParticipant}
              onChangeText={setNewParticipant}
              placeholder="Nome do participante"
              onSubmitEditing={handleAddParticipant}
            />
          </View>
        )}
      </ScrollView>
      <View style={styles.navigationButtons}>
        {step === 1 && (
          <NavigationButton label="Próximo" onPress={handleNextStep} />
        )}

        {step === 2 && (
          <>
            <NavigationButton label="Voltar" onPress={handlePrevStep} />
            <NavigationButton label="Próximo" onPress={handleNextStep} />
          </>
        )}

        {step === 3 && (
          <>
            <NavigationButton label="Voltar" onPress={handlePrevStep} />
            <NavigationButton
              label="Criar"
              onPress={handleCreateEvent}
              backgroundColor="white"
              textColor="#38a37f"
            />
          </>
        )}
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a139a',
    padding: 20,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formStep: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    color: 'white',
    marginBottom: 60,
    textAlign: 'center',
  },
  addButtonContainer: {
    marginBottom: 20, 
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#38a37f',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  participantsContainer: {
    marginTop: 10,
  },
  participant: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});