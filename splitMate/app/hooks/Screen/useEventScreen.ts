import { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { useCurrentEventStore } from '~/store/useCurrentEventStore';
import { EventManager } from '~/core/Event/EventManager';

interface Expense {
  name: string;
  value: string;
}

interface EventData {
  id: string;
  title: string;
  date: string;
  expenses: Expense[];
}

export function useEventScreen() {
  const { eventId } = useLocalSearchParams<{ eventId?: string }>();
  const { setEventId } = useCurrentEventStore();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      if (!eventId) return;

      try {
        const fetchedEvent = await EventManager.getEventById(eventId);
        setEvent(fetchedEvent);
        setEventId(eventId);
      } catch (error) {
        console.error('Erro ao carregar evento:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [eventId]);

  const handleAddExpense = () => {
    router.push('/views/NewExpenseScreen');
  };

  return {
    title: event?.title ?? '',
    date: event?.date ?? '',
    expenses: event?.expenses ?? [],
    loading,
    handleAddExpense,
  };
}
