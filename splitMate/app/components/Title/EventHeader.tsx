import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EventHeaderProps {
  title: string;
  date: string;
}

export default function EventHeader({ title, date }: EventHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <Ionicons name="calendar" size={20} color="#5a139a" />
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.underline} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#5a139a',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 15,
    color: '#5a139a',
    marginLeft: 6,
    fontWeight: '500',
  },
  underline: {
    width: 90,
    height: 4,
    backgroundColor: '#5a139a',
    borderRadius: 2,
    marginTop: 6,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
});
