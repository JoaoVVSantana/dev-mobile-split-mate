import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TExpense } from '~/types/TExpense';
import { Ionicons } from '@expo/vector-icons';


interface ExpenseCardProps {
  expense: TExpense;
  onPress: () => void;

}

export default function ExpenseCard({ expense, onPress }: ExpenseCardProps) {

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{expense.name}</Text>
        <Text style={styles.amount}>R$ {expense.value.toFixed(2)}</Text>
      </View>

      <View style={styles.statusRow}>
        <Ionicons
          name={expense.isPayed ? 'checkmark-circle' : 'close-circle'}
          size={16}
          color={expense.isPayed ? '#38a37f' : '#d9534f'}
          style={{ marginRight: 4 }}
        />
        <Text style={[styles.statusText, expense.isPayed ? styles.paid : styles.unpaid]}>
          {expense.isPayed ? 'Paga' : 'Pendente'}
        </Text>
      </View>

      <View style={styles.participantsContainer}>
        {expense.participants.map((p, idx) => {
          const hasPaid = (p as any).hasPaid;
          return (
            <View key={idx} style={styles.participantRow}>
              <Ionicons
                name={hasPaid ? 'checkmark' : 'close'}
                size={14}
                color={hasPaid ? '#38a37f' : '#d9534f'}
                style={{ marginRight: 4 }}
              />
              <Text style={[styles.participantName, hasPaid ? styles.paid : styles.unpaid]}>
                {p.name}
              </Text>
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#5a139a',
    borderRadius: 20,
    width: '47%',
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  header: {
    marginBottom: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  amount: {
    fontSize: 15,
    color: 'white',
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  paid: {
    color: '#38a37f',
  },
  unpaid: {
    color: '#ffd5d5',
  },
  participantsContainer: {
    marginTop: 12,
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 8,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  participantName: {
    fontSize: 14,
    fontWeight: '500',
  },
});
