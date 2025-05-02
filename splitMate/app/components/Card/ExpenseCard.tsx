import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ExpenseCardProps {
  name: string;
  value: string;
}

export default function ExpenseCard({ name, value }: ExpenseCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#38a37f',
    borderRadius: 20,
    width: '47%',
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
});
