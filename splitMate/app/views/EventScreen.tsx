import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useEventScreen } from '../hooks/Screen/useEventScreen';
import ExpenseCard from '../components/Card/ExpenseCard';
import FloatingButton from '../components/Buttons/FloatingButton';
import AddExpenseButton from '../components/Buttons/AddExpenseButton';
import EventHeader from '../components/Title/EventHeader';
import BackArrowButton from '../components/Buttons/BackArrowButton'; 

export default function EventScreen() {
  const {
    title,
    date,
    expenses,
    handleAddExpense,
  } = useEventScreen();

  return (
    <View style={styles.container}>
      <BackArrowButton />
      <EventHeader title={title} date={date} />

      <AddExpenseButton title="Adicionar despesa" onPress={handleAddExpense} />


      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {expenses.map((item, index) => (
          <ExpenseCard key={index} name={item.name} value={item.value} />
        ))}
      </ScrollView>

      <FloatingButton onPress={handleAddExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
    position: 'relative',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
});