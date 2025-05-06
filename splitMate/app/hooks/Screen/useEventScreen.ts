import { router } from 'expo-router';
import { useCurrentEventStore } from '~/store/useCurrentEventStore';
import { TExpense } from '~/types/TExpense';

export function useEventScreen() {
  const { currentEvent, setCurrentExpense } = useCurrentEventStore();

  const handleAddExpense = () => {
    router.push('/views/NewExpenseScreen');
  };
  
  const navigateToExpense = (expense: TExpense) => {
    try {
      setCurrentExpense(expense);
      router.push({
        pathname: '/views/ExpenseScreen',
      });
    } catch (error) {
      console.error('Erro ao navegar para tela do evento:', error);
    }
  };

  console.log(currentEvent);
  return {
      title: currentEvent?.title ?? '',
      date: currentEvent?.date ?? '',
      expenses: currentEvent?.expenses ?? [],
      loading: !currentEvent, 
    handleAddExpense,
    navigateToExpense,
 
  };
}
