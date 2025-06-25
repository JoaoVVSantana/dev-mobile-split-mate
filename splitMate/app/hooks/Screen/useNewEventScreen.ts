import { useState } from 'react';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import { useCurrentEventStore } from '~/store/useCurrentEventStore';
import { useCommunityStore } from '~/store/useCommunityStore';
import { TFriend } from '~/types/TFriend';
import { EventManager } from '~/core/Event/EventManager';

export function useNewEventScreen() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const { addEvent, setCurrentEvent } = useCurrentEventStore();
  const { friends } = useCommunityStore();
  const router = useRouter();

  const availableParticipants = friends.map((f) => f.name);

  const handleToggle = (name: string) => {
    setSelectedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const handleCreateEvent = async () => {
    if (!eventName.trim() || !eventDate.trim() || selectedNames.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Preencha nome, data e participantes!',
      });
      return;
    }

    try {
      const participants: TFriend[] = friends.filter((f) =>
        selectedNames.includes(f.name),
      );


      const newEvent = await EventManager.createEvent({
        title: eventName.trim(),
        date: eventDate.trim(),
        participants,
      });


      addEvent(newEvent);
      setCurrentEvent(newEvent);

      Toast.show({ type: 'success', text1: 'Evento criado com sucesso!' });
      router.push('../../tabs/HomeScreen');
    } catch (err) {
      console.error('Erro ao criar evento:', err);
      Toast.show({ type: 'error', text1: 'Falha ao salvar no Firebase' });
    }
  };

  return {
    eventName,
    eventDate,
    participants: selectedNames,
    setEventName,
    setEventDate,
    availableParticipants,
    handleToggle,
    handleCreateEvent,
  };
}
