import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useCurrentEventStore } from '~/store/useCurrentEventStore';

export function useNewEventScreen() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const { setEventId } = useCurrentEventStore();

  const availableParticipants = [
    'Ana Luíza',
    'Letícia Costa',
    'Murilo Silva',
    'Carlos Souza',
    'João Pereira',
    'Maria Oliveira',
    'Fernanda Lima',
    'Lucas Santos',
    'Juliana Almeida',
  ];

  const router = useRouter();

  const handleToggle = (participant: string) => {
    setParticipants((prev) =>
      prev.includes(participant)
        ? prev.filter((p) => p !== participant)
        : [...prev, participant]
    );
  };

  const handleCreateEvent = () => {
    const fakeId = Date.now().toString(); // Mudar aqui depois do DB
  
    console.log({ eventName, eventDate, participants });
    setEventId(fakeId);
  
    Alert.alert('Sucesso', 'Evento criado com sucesso!', [
      {
        text: 'OK',
        onPress: () => router.push('../tabs/home'),
      },
    ]);
  };
  

  return {
    eventName,
    eventDate,
    participants,
    setEventName,
    setEventDate,
    availableParticipants,
    handleToggle,
    handleCreateEvent,
  };
}
