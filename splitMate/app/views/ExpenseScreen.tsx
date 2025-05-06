import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useExpenseScreen } from "~/hooks/Screen/useExpenseScreen";
import BackArrowButton from "~/components/Buttons/BackArrowButton";
import TitleComponent from "~/components/Title/TitleComponent";
import { useCommunityStore } from "~/store/useCommunityStore";

export default function ExpenseScreen() {
  const { name, value, owner, participants, handlePay } = useExpenseScreen();
  const { user } = useCommunityStore();

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
        {participants
          .filter((participant) => participant.id !== owner?.id)
          .map((participant, index) => (
            <View key={index} style={styles.participantRow}>
              <Text style={styles.participantName}>{participant.name}</Text>
              <Text style={styles.debtValue}>
                R$ {individualShare.toFixed(2)}
              </Text>
            </View>
          ))}

        {user?.id !== owner?.id && (
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => handlePay()}
          >
            <Text style={styles.payButtonText}>Pagar pra {owner?.name}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5a139a",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  label: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 24,
  },
  owner: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    marginTop: 4,
  },
  value: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    marginTop: 4,
  },
  participantRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff20",
    paddingBottom: 8,
  },
  participantName: {
    color: "#fff",
    fontSize: 16,
  },
  debtValue: {
    color: "#ffd5d5",
    fontSize: 16,
  },
  payButton: {
    marginTop: 32,
    backgroundColor: "#38a37f",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
