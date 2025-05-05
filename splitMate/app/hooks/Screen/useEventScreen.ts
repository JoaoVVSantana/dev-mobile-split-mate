import { router } from 'expo-router';
import { useCurrentEventStore } from '~/store/useCurrentEventStore';

export function useEventScreen() {
  const { currentEvent } = useCurrentEventStore();

  const handleAddExpense = () => {
    router.push('/views/NewExpenseScreen');
  };

  return {
    title: currentEvent?.title ?? '',
    date: currentEvent?.date ?? '',
    expenses: currentEvent?.expenses ?? [],
    loading: !currentEvent, 
    handleAddExpense,
  };
}
