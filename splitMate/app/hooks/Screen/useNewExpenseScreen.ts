import { useState } from 'react';
import { router } from 'expo-router';

import { useCurrentEventStore } from '~/store/useCurrentEventStore';
import { useCreateNewExpense } from '~/hooks/Expense/useCreateNewExpense';
import { useToastFeedback, EToastVariants } from '~/components/Toast/ToastFeedback';

export function useNewExpenseScreen() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const { currentEvent } = useCurrentEventStore();
  const { createExpense } = useCreateNewExpense();
  const { showToast } = useToastFeedback();

  const participants = currentEvent?.participants?.map(p => p.name) || [];

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

  const handleCreate = async () => {
    try {
  console.log('DEBUG:', { name, value, selectedParticipants, currentEvent });
  const ok = await createExpense({ name, value, participants: selectedParticipants });
  console.log('RESULT createExpense:', ok);

      if (ok) {
        showToast({
          variant: EToastVariants.SUCCESS,
          message: 'Despesa criada com sucesso!',
        });

        setTimeout(() => {
          router.push('/views/EventScreen');
        }, 1500);
      } else {
        showToast({
          variant: EToastVariants.ERROR,
          message: 'Erro ao criar despesa. Verifique os dados.',
        });
      }
    } catch (error) {
      console.error('Erro inesperado ao criar despesa:', error);
      showToast({
        variant: EToastVariants.ERROR,
        message: 'Erro inesperado ao criar despesa.',
      });
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
