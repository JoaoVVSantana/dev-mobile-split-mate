import { useCurrentEventStore } from '~/store/useCurrentEventStore';
import { useCommunityStore } from '~/store/useCommunityStore';
import { TExpense } from '~/types/TExpense';
import { IExpenseParticipant } from '~/types/IExpenseParticipant';

export function useExpenseScreen() {
  const { currentExpense, setCurrentExpense, currentEvent, setCurrentEvent } = useCurrentEventStore();
  const { user } = useCommunityStore();


  const handlePay = (receiptImageUri?: string) => {
    if (!currentExpense || !user) return;

    const updatedParticipants: IExpenseParticipant[] = currentExpense.participants.map(
      (participant) => {
        if (participant.id === user.id) {
          return {
            ...participant,
            hasPaid: true,
            receiptImageUri: receiptImageUri ?? null,
          };
        }
        return participant;
      }
    );

    const updatedExpense: TExpense = {
      ...currentExpense,
      id: currentExpense.id,
      participants: updatedParticipants,
    };

    setCurrentExpense(updatedExpense);

    if (currentEvent) {
      const updatedEvent = {
        ...currentEvent,
        expenses: currentEvent.expenses.map((e) =>
          e.id === updatedExpense.id ? updatedExpense : e
        ),
      };

      setCurrentEvent(updatedEvent);
    }
  };

  return {
    id: currentExpense?.id ?? '',
    name: currentExpense?.name ?? '',
    value: currentExpense?.value ?? 0,
    isPayed: currentExpense?.isPayed ?? false,
    participants: currentExpense?.participants ?? [],
    owner: currentExpense?.owner ?? null,
    handlePay,
  };
}
