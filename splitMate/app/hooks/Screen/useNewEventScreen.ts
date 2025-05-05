import { useState } from 'react';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import { useCurrentEventStore } from '~/store/useCurrentEventStore';
import { useCommunityStore } from '~/store/useCommunityStore';
import { TEvent } from '~/types/TEvent';
import { TFriend } from '~/types/TFriend';

export function useNewEventScreen() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);

  const { addEvent, setCurrentEvent } = useCurrentEventStore();
  const { friends } = useCommunityStore();
  const router = useRouter();

  const availableParticipants = friends.map((friend: TFriend) => friend);

  const handleToggle = (participant: string) => {
    setParticipants((prev) =>
      prev.includes(participant)
        ? prev.filter((p) => p !== participant)
        : [...prev, participant]
    );
  };

  const handleCreateEvent = () => {
    try {
      const newEvent: TEvent = {
        id:'0',
        title: eventName.trim(),
        date: eventDate.trim(),
        participants: availableParticipants,
        expenses: [],
      };

      addEvent(newEvent);
      setCurrentEvent(newEvent);

      Toast.show({
        type: 'success',
        text1: 'Evento criado com sucesso!',
      });

      setTimeout(() => {
        router.push('../../tabs/HomeScreen');
      }, 500);
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
