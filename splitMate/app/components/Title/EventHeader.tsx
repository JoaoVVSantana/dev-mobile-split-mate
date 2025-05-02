import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EventHeaderProps {
  title: string;
  date: string;
}

export default function EventHeader({ title, date }: EventHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5a139a',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
