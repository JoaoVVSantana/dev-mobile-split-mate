import { useState } from 'react';
import { useCreateNewExpense } from '~/hooks/Expense/useCreateNewExpense';
import { useCurrentEventStore } from '~/store/useCurrentEventStore';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export function useNewExpenseScreen() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const [participants] = useState([
    'Ana Luíza', 'Letícia Costa', 'Murilo Silva',
    'Carlos Souza', 'João Pereira', 'Maria Oliveira',
    'Fernanda Lima', 'Lucas Santos', 'Juliana Almeida',
  ]);

  const { eventId } = useCurrentEventStore();
  const { createExpense } = useCreateNewExpense();

  const handleValueChange = (text: string) => {
    setValue(text.replace(/[^0-9,]/g, ''));
  };

  const handleParticipantSelection = (participant: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(participant)
        ? prev.filter((item) => item !== participant)
        : [...prev, participant]
    );
  };

  const handleCreate = () => {
    const success = createExpense({
      name,
      value,
      participants: selectedParticipants,
    });

    if (success && eventId) {
      Alert.alert('Sucesso', 'Despesa criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.push(`/views/EventScreen?eventId=${eventId}`),
        },
      ]);
    }
  };

  return {
    name,
    value,
    participants,
    selectedParticipants,
    setName,
    handleValueChange,
    handleParticipantSelection,
    handleCreate,
  };
}
