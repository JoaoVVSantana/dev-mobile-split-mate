import { useCurrentEventStore } from "~/store/useCurrentEventStore";
import { useCommunityStore } from "~/store/useCommunityStore";
import { TExpense } from "~/types/TExpense";
import { IExpenseParticipant } from "~/types/IExpenseParticipant";
import { EventManager } from "~/core/Event/EventManager";

export function useExpenseScreen() {
  const { currentExpense, setCurrentExpense, currentEvent, setCurrentEvent, updateExpense } =
    useCurrentEventStore();
  const { user } = useCommunityStore();

  const persistExpense = async (updated: TExpense) => {
    if (currentEvent) {
      await EventManager.updateExpense(currentEvent.id, updated.id, updated);
      updateExpense(currentEvent.id, updated);
    }
  };

  const toggleParticipantPaid = (participantId: string) => {
    if (!currentExpense) return;
    const updatedParticipants = currentExpense.participants.map((p) =>
      p.id === participantId ? { ...p, hasPaid: !p.hasPaid } : p
    );
    persistExpense({ ...currentExpense, participants: updatedParticipants });
  };

  const markExpensePaid = () => {
    if (!currentExpense) return;

    const updatedParticipants = currentExpense.participants.map((p) => ({
      ...p,
      hasPaid: true,
    }));

    persistExpense({
      ...currentExpense,
      isPayed: true,
      participants: updatedParticipants,
    });
  };

  return {
    id: currentExpense?.id ?? "",
    name: currentExpense?.name ?? "",
    value: currentExpense?.value ?? 0,
    isPayed: currentExpense?.isPayed ?? false,
    participants: currentExpense?.participants ?? [],
    owner: currentExpense?.owner ?? null,
    toggleParticipantPaid,
    markExpensePaid,
  };
}
