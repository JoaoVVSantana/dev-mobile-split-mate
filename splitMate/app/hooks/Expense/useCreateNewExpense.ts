import { Alert } from "react-native";
import { useCurrentEventStore } from "~/store/useCurrentEventStore";
export function useCreateNewExpense() {
    const { eventId } = useCurrentEventStore();
  
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
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return false;
      }
  
      console.log('Despesa criada:', { name, value, participants, eventId });
  
      return true;
    };
  
    return { createExpense };
  }
  