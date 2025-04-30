import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface EventCardProps {
  eventName: string;
  color: string;
  onPress?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ eventName, color, onPress }) => {
  return (
    <TouchableOpacity style={[styles.eventButton, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.eventText}>{eventName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventButton: {
    fontWeight: 'bold',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    height: 80,
  },
  eventText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EventCard;
