import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

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
    try {
      console.log({ eventName, eventDate, participants });

      Toast.show({
        type: 'success',
        text1: 'Evento criado com sucesso!',
      });

      setTimeout(() => {
        router.push('../../tabs/HomeScreen');
      }, 500); // Delay pequeno para garantir exibição do toast antes da navegação
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    }
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
