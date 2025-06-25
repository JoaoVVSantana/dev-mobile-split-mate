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

  const toast = useToastFeedback();

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

      const ok = await createExpense({ name, value, participants: selectedParticipants });

      if (ok) {
        
        toast.showToast({
      variant: EToastVariants.SUCCESS,
      message: 'Despesa criada com sucesso!',
    });
     setTimeout(() => {
      router.back();
    }, 2000);

      } else {
        toast.showToast({
          variant: EToastVariants.ERROR,
          message: 'Erro ao criar despesa. Verifique os dados.',
        });
      }
    } 
    catch (error) {
      console.error('Erro inesperado ao criar despesa:', error);
      toast.showToast({
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
