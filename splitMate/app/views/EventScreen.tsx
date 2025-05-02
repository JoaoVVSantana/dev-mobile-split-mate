import React from 'react';
import { View, ScrollView } from 'react-native';

import { useEventScreen } from '~/hooks/Screen/useEventScreen';
import ExpenseCard from '~/components/Card/ExpenseCard';
import FloatingButton from '~/components/Buttons/FloatingButton';
import AddExpenseButton from '~/components/Buttons/AddExpenseButton';
import EventHeader from '~/components/Title/EventHeader';
import BackArrowButton from '~/components/Buttons/BackArrowButton';
import { container, cardsContainer } from '~/styles/EventStyles';

export default function EventScreen() {
  const {
    title,
    date,
    expenses,
    handleAddExpense,
  } = useEventScreen();

  return (
    <View style={container}>
      <BackArrowButton />
      <EventHeader title={title} date={date} />

      <AddExpenseButton title="Adicionar despesa" onPress={handleAddExpense} />

      <ScrollView contentContainerStyle={cardsContainer}>
        {expenses.map((item, index) => (
          <ExpenseCard key={index} name={item.name} value={item.value} />
        ))}
      </ScrollView>

      <FloatingButton onPress={handleAddExpense} />
    </View>
  );
}
