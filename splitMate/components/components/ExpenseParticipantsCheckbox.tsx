import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface ParticipantsCheckboxesProps {
  participants: string[];
  selectedParticipants: string[];
  onSelectParticipant: (participant: string) => void;
}

const ParticipantsCheckboxes: React.FC<ParticipantsCheckboxesProps> = ({
  participants,
  selectedParticipants,
  onSelectParticipant,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Participantes</Text>
      {/* Contêiner da lista de checkboxes com borda */}
      <View style={styles.checkboxContainerWrapper}>
        <ScrollView style={styles.scrollView}>
          {participants.map((participant, index) => (
            <View key={index} style={styles.checkboxRow}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  selectedParticipants.includes(participant) && styles.selectedCheckbox,
                ]}
                onPress={() => onSelectParticipant(participant)}
              >
                <Text style={styles.checkboxText}>
                  {selectedParticipants.includes(participant) ? '✔' : ''}
                </Text>
              </TouchableOpacity>
              <Text style={styles.participantText}>{participant}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#5a139a',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  checkboxContainerWrapper: {
    borderColor: '#5a139a', 
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  scrollView: {
    maxHeight: 200,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderColor: '#38a37f', 
  },
  selectedCheckbox: {
    backgroundColor: '#38a37f', 
  },
  checkboxText: {
    fontSize: 12,
    color: 'white',
  },
  participantText: {
    fontSize: 16,
  },
});

export default ParticipantsCheckboxes;
