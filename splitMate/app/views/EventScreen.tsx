import React from 'react';
import { View, ScrollView } from 'react-native';
import { useEventScreen } from '~/hooks/Screen/useEventScreen';
import ExpenseCard from '~/components/Card/ExpenseCard';
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
    navigateToExpense
  } = useEventScreen();

  return (
    <View style={container}>
      <BackArrowButton />
      <EventHeader title={title} date={date} />

      <AddExpenseButton title="Adicionar despesa" onPress={handleAddExpense} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={cardsContainer}>
        {expenses.map((item) => (
          <ExpenseCard
            key={item.id}
            expense={item}
            onPress={() => navigateToExpense(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
