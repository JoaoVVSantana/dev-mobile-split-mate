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
import PayButton from "~/components/Buttons/PayButton";

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

        <ScrollView style={styles.participantsScroll}>
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
        </ScrollView>
      </ScrollView>

      {user?.id !== owner?.id && (
        <View style={styles.payButtonContainer}>
          <PayButton onPress={handlePay} ownerName={owner?.name || "o dono"} />
        </View>
      )}
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
  participantsScroll: {
    maxHeight: 300, 
    marginTop: 10,
    padding: 10,
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
  payButtonContainer: {
    position: "absolute",
    bottom: 118, 
    left: 20,
    right: 20,
    zIndex: 1,
  },
});
