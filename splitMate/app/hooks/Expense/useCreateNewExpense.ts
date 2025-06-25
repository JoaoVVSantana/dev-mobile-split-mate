import { nanoid } from "nanoid";
import { useCurrentEventStore } from "~/store/useCurrentEventStore";
import { useCommunityStore } from "~/store/useCommunityStore";
import { IExpenseParticipant } from "~/types/IExpenseParticipant";
import { TFriend } from "~/types/TFriend";
import { EventManager } from "~/core/Event/EventManager";

export function useCreateNewExpense() {
  const { currentEvent, setCurrentEvent, events, setEvents } =
    useCurrentEventStore();
  const { user } = useCommunityStore();

  const createExpense = async ({
    name,
    value,
    participants,
  }: {
    name: string;
    value: string;
    participants: string[];
  }) => {
    if (!currentEvent) {
      return false;
    }

    const expenseParticipants: TFriend[] = currentEvent.participants.filter(
      (p) => participants.includes(p.name)
    );

if (!user) {
  console.warn('Usuário não carregado — verifique useFirebaseUser');
  return false;
}


    const newExpense = await EventManager.addExpense(currentEvent.id, {
      name: name.trim(),
      value: parseFloat(value.replace(",", ".")),
      owner: user as TFriend,
      participants: expenseParticipants as IExpenseParticipant[],
    });
    const updatedEvent = {
      ...currentEvent,
      expenses: [...currentEvent.expenses, newExpense],
    };

    setCurrentEvent(updatedEvent);
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));

    return true;
  };

  return { createExpense };
}
