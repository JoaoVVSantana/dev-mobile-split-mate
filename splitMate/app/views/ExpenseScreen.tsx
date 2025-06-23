// ~/screens/ExpenseScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useExpenseScreen } from '~/hooks/Screen/useExpenseScreen';
import BackArrowButton from '~/components/Buttons/BackArrowButton';
import TitleComponent from '~/components/Title/TitleComponent';

export default function ExpenseScreen() {
  const {
    name,
    value,
    owner,
    participants,
    toggleParticipantPaid,
    markExpensePaid,
  } = useExpenseScreen();

  const totalParticipants = participants.length + 1;
  const individualShare = value / totalParticipants;

  return (
    <View style={styles.container}>
      <BackArrowButton />
      <TitleComponent title={name} color="#ffffff" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Quem pagou:</Text>
        <Text style={styles.owner}>{owner?.name}</Text>

        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>R$ {value.toFixed(2)}</Text>

        <Text style={styles.label}>Cada um deve:</Text>

        <ScrollView style={styles.participantsScroll}>
          {participants
            .filter((p) => p.id !== owner?.id)
            .map((participant) => (
              <View key={participant.id} style={styles.participantRow}>
                {/* Checkbox */}
                <Pressable
                  onPress={() => toggleParticipantPaid(participant.id)}
                  style={styles.checkboxWrapper}
                >
                  <View
                    style={[
                      styles.checkbox,
                      participant.hasPaid && styles.checkboxChecked,
                    ]}
                  />
                </Pressable>

                <Text style={styles.participantName}>{participant.name}</Text>
                <Text style={styles.debtValue}>
                  R$ {individualShare.toFixed(2)}
                </Text>
              </View>
            ))}
        </ScrollView>
      </ScrollView>

      {/* Botão verde no rodapé */}
      <TouchableOpacity style={styles.payButton} onPress={markExpensePaid}>
        <Text style={styles.payButtonText}>Marcar despesa como paga</Text>
      </TouchableOpacity>
    </View>
  );
}

const CHECKBOX_SIZE = 22;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5a139a',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  scrollContent: { paddingBottom: 120 },
  participantsScroll: {
    maxHeight: 300,
    marginTop: 10,
    padding: 10,
  },
  label: {
    color: '#a3a3a3',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
  },
  owner: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    marginTop: 4,
  },
  value: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    marginTop: 4,
  },
  /* -------- participantes -------- */
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff20',
    paddingBottom: 8,
  },
  participantName: { color: '#fff', fontSize: 16, flex: 1, marginLeft: 8 },
  debtValue: { color: '#ffd5d5', fontSize: 16 },
  /* -------- checkbox -------- */
  checkboxWrapper: { width: CHECKBOX_SIZE, height: CHECKBOX_SIZE },
  checkbox: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#32cd32',
    borderColor: '#32cd32',
  },
  /* -------- botão verde -------- */
  payButton: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: '#32cd32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
