import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ViewStyle,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ParticipantsCheckboxesProps {
  participants: string[];
  selectedParticipants: string[];
  onSelectParticipant: (participant: string) => void;
  label?: string;
  labelColor?: string;
  containerStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
}

const ParticipantsCheckboxes: React.FC<ParticipantsCheckboxesProps> = ({
  participants,
  selectedParticipants,
  onSelectParticipant,
  label = 'Participantes',
  labelColor = '#5a139a',
  containerStyle,
  checkboxStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <View style={styles.checkboxContainerWrapper}>
        <ScrollView style={styles.scrollView}>
          {participants.map((participant, index) => {
            const isSelected = selectedParticipants.includes(participant);
            return (
              <View key={index} style={styles.checkboxRow}>
                <Pressable
                  onPress={() => onSelectParticipant(participant)}
                  style={({ pressed }) => [
                    styles.checkbox,
                    checkboxStyle,
                    isSelected && styles.selectedCheckbox,
                    pressed && styles.pressed,
                  ]}
                >
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color="white"
                    style={{ opacity: isSelected ? 1 : 0 }}
                  />
                </Pressable>
                <Text
                  style={[
                    styles.participantText,
                    isSelected && styles.participantSelectedText,
                  ]}
                >
                  {participant}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width:'50%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
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
    maxHeight: 280,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 36,                
    height: 36,                   
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderColor: '#38a37f',
    backgroundColor: '#5a139a',   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },

  selectedCheckbox: {
    backgroundColor: '#38a37f',
    borderColor: '#38a37f',
    shadowColor: '#38a37f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  participantText: {
    fontSize: 16,
    color: '#ffffff',
  },
  participantSelectedText: {
    color: '#38a37f',
    fontWeight: 'bold',
  },
});

export default ParticipantsCheckboxes;
