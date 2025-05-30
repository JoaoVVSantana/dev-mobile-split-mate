import { useState } from 'react';
import { router } from 'expo-router';

import { useCurrentEventStore } from '~/store/useCurrentEventStore';
import { useCreateNewExpense } from '~/hooks/Expense/useCreateNewExpense';
import { useToastFeedback, EToastVariants } from '~/components/Toast/ToastFeedback';
import { useCommunityStore } from '~/store/useCommunityStore';

export function useNewExpenseScreen() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const { currentEvent } = useCurrentEventStore();
  const { createExpense } = useCreateNewExpense();
  const { showToast } = useToastFeedback();
  const { user } = useCommunityStore();

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

  const handleCreate = () => {
    try {
      if (!user || !currentEvent) {
        showToast({
          variant: EToastVariants.ERROR,
          message: 'Erro: usuário ou evento não encontrado.',
        });
        return;
      }

      const success = createExpense({
        id: `${Date.now()}`, // Generate a temporary ID using timestamp
        name,
        value,
        owner: user,
        participants: selectedParticipants,
      });

      if (success) {
        showToast({
          variant: EToastVariants.SUCCESS,
          message: 'Despesa criada com sucesso!',
        });

        setTimeout(() => {
          try {
            router.push('/views/EventScreen');
          } catch (error) {
            console.error('Erro ao redirecionar:', error);
            showToast({
              variant: EToastVariants.ERROR,
              message: 'Erro ao redirecionar para a tela do evento.',
            });
          }
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
