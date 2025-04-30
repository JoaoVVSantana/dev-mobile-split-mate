import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const EventCard = ({ eventName, color }: { eventName: string; color: string }) => {
  return (
    <TouchableOpacity style={[styles.eventButton, { backgroundColor: color }]}>
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
