import { useCurrentEventStore } from '~/store/useCurrentEventStore';
import { IExpenseParticipant } from '~/types/IExpenseParticipant';
import { TExpense } from '~/types/TExpense';
import { TFriend } from '~/types/TFriend';

export function useCreateNewExpense() {
  const { currentEvent, setCurrentEvent, setEvents, events } = useCurrentEventStore();

  const createExpense = ({
    name,
    value,
    participants,
  }: {
    name: string;
    value: string;
    participants: string[];
  }) => {
    if (!name || !value || participants.length === 0) {
      return false;
    }

    if (!currentEvent) return false;

 
    const expenseParticipants: TFriend[] = currentEvent.participants.filter((p) =>
      participants.includes(p.name)
    );

    const newExpense: TExpense = {
      name,
      value: parseFloat(value.replace(',', '.')),
      isPayed: false,
      participants: expenseParticipants as IExpenseParticipant[],
    };

    const updatedEvent = {
      ...currentEvent,
      expenses: [...currentEvent.expenses, newExpense],
    };

    setCurrentEvent(updatedEvent);

    const updatedEvents = events.map((e) =>
      e.id === updatedEvent.id ? updatedEvent : e
    );
    setEvents(updatedEvents);

    return true;
  };

  return { createExpense };
}
